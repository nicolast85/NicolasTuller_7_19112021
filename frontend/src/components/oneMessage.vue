<template>
  <div>
    <nav id="nav">
      <ul class="links">
        <li>
          <router-link to="/forum">Retour</router-link>
        </li>
      </ul>
    </nav>
    <div id="oneMessage">
      <div id="comment-card" v-for="comment in allComments" :key="comment.id">
        <div class="content">
          <i class="date">{{ moment(comment.createdAt).fromNow() }}</i>
          <i class="user-name"
            >{{ comment.User.lastname }} {{ comment.User.firstname }}</i
          ><br />
        </div>
        <div class="com">{{ comment.comment }}</div><br />
        <div v-if="comment.idUsers == userId">
          <deleteComment :idComm="comment.id" />
        </div>
        <div v-if="isAdmin == true">
          <deleteComment :idComm="comment.id" />
        </div>
      </div>
    </div>
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
      allComments: [],
    };
  },
  methods: {
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
          console.log(this.allComments)
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadComments();
  },
};
</script>

<style scoped>
li {
  text-align-last: right;
  margin-right: 1rem;
  list-style-type: none;
}
.date {
  margin-right: 1rem;
}
.content {
  text-align: left;
  color: #FD2D01;
  margin-left: 1.25rem;
}
.com {
  margin-top: 1rem;
}
#comment-card {
  margin: 1rem;
  padding: 0.5rem;
  border: solid #091F43;
  border-width: 2px;
  width: auto;
  color: #091F43;
  border-radius: 50px;
}
</style>