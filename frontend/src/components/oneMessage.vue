<template>
  <div>
    <nav id="nav">
      <!--Logo-->
      <img class=logo src="../assets/logo/icon-left-font.png" alt="logo" />
      <!--Menu de navigation-->
      <ul class="links">
        <li><router-link to="/login" class="link" title="Déconnexion" v-on:click="Logout()">
          <i class="fas fa-exclamation-triangle"></i>Déconnexion</router-link></li>
        <li><router-link to="/forum" title="Revenir au Forum"><i class="fas fa-reply">
          </i>Retour au Forum</router-link></li>
        <li><router-link to="/profile" class="link" title="Aller sur votre Profil"><i class="fas fa-user-circle">
          </i>Votre Profil</router-link></li>
      </ul>
    </nav>
    <!--Structure du message-->
    <div id="oneMessage">
      <div class="post">
        <h1 class="title">{{ oneMessage.title }}</h1>
        <div class="content_message">
          <img
            :src="oneMessage.image"
            :alt="oneMessage.image"
            v-if="oneMessage.image != null"
          /><br />
          {{ oneMessage.content }}
        </div>
        <div class="createdAt">
        <i class="date">{{ moment(oneMessage.createdAt).fromNow() }}</i>
        <i>{{ oneMessage.User }}</i>
      </div>
      </div>
      <!--Commentaires du message-->
      <div class="post_com">
      <div id="comment-card" v-for="comment in allComments" :key="comment.id">
        <div class="content">
          <div class="user-name">{{ comment.User.lastname }} {{ comment.User.firstname }}</div>
          <div class="date">{{ moment(comment.createdAt).fromNow() }}</div>
        </div>
        <div class="com">{{ comment.comment }}</div><br />
        <!--Bouton de suppression de commentaire-->
        <div v-if="isAdmin == true">
          <deleteComment :idComm="comment.id" />
        </div>
        <div v-else-if="comment.idUsers == userId">
          <deleteComment :idComm="comment.id" />
        </div>
      </div>
      </div>
    </div>
    <!--Nouveau commentaire-->
    <div class="commentaire">
      <newComment :id="id" />
    </div>
  </div>
</template>


<script>
let moment = require("moment");
import newComment from "./newComment";
import deleteComment from "./deleteComment";
const jwt = require('jsonwebtoken');
import axios from "axios";
export default {
  name: "oneMessage",
  components: {
    deleteComment,
    newComment,
  },
  data() {
    return {
      moment: moment,
      token: "",
      isAdmin: "",
      id: this.$route.params.id,
      userId: localStorage.getItem("id"),
      oneMessage: [],
      idUsers: "",
      title: "",
      content: "",
      file: null,
      createAt: "",
      updateAt: "",
      allComments: [],
      User: [],
    };
  },
  methods: {
    loadOneMessage() {
      let token = localStorage.getItem("token");
      let decodedToken = jwt.verify(token, "vDi-7Ge>AaT}5im5C724VGf#V8%/$hvX7QDnHB5p}kVg7za9HCf-6&HT;.2!R49&+857rSjVXP{_8-zvyf2u.5KY$p}}9)]jk375");
      axios
        .get("http://localhost:3000/api/messages/" + this.id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.isAdmin = decodedToken.isAdmin;
          this.oneMessage = res.data;
          console.log(res.data);
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    loadComments() {
      let token = localStorage.getItem("token");
      let decodedToken = jwt.verify(token, "vDi-7Ge>AaT}5im5C724VGf#V8%/$hvX7QDnHB5p}kVg7za9HCf-6&HT;.2!R49&+857rSjVXP{_8-zvyf2u.5KY$p}}9)]jk375");
      axios
        .get("http://localhost:3000/api/messages/" + this.id + "/comments/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.isAdmin = decodedToken.isAdmin;
          this.allComments = res.data;
          console.log(res.data);
          console.log(this.allComments)
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadComments();
    this.loadOneMessage();
  },
  Logout() {
    localStorage.clear();
    this.$router.push("/");
  },
};
</script>

<style scoped>
@media (min-width: 50px) {
li {
  text-align-last: right;
  margin-right: 1rem;
  margin-top: 0.5rem;
  list-style-type: none;
}
.date {
  margin-right: 1rem;
  margin-left: 1rem;
}
.user-name {
  margin-left: 2rem;
}
.content {
  text-align: left;
  color: #FD2D01;
  background-color: rgb(224, 219, 219);
  border-radius: 50px 50px 0 0;
  margin-top: -0.25rem;
  border-top: solid #091F43;
  border-right: solid #091F43;
  border-left: solid #091F43;
  border-width: 2px;
}
.com {
  margin-top: 1rem;
}
#comment-card {
  margin: 1rem;
  border: solid #091F43;
  border-width: 2px;
  width: auto;
  color: #091F43;
  border-radius: 50px;
}
.post_com {
  margin-top: 2.5rem;
}
.createdAt {
  color: #091F43;
  text-align: end;
  margin-right: 1rem;
}
.content_message {
  margin: 1rem;
  margin-bottom: 1.5rem;
}
.content_message img {
  width: 300px;
  margin-bottom: 0.75rem;
}
.post {
  margin: 1rem;
  padding-bottom: 0.5rem;
  padding-right: 0.5rem;
  border: solid #FD2D01;
  border-width: 2px;
  width: auto;
  color: #FD2D01;
  border-radius: 50px;
}
.title {
  margin-top: 1rem;
}
}
@media (min-width: 800px) {
  .content_message img {
    width: 400px;
  }
  .post, #comment-card {
    margin-right: 3rem;
    margin-left: 3rem;
  }
}
</style>