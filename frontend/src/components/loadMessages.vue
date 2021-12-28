<template>
  <div class="forum">
    <!--Structure d'un message-->
    <div id="message-card" v-for="message in allMessages" :key="message.id">
      <div class="createdAt">
        <div class="name">{{ message.User.lastname }} {{ message.User.firstname }}</div>
        <div class="date">{{ moment(message.createdAt).fromNow() }}</div>
      </div>
      <p class="title">{{ message.title }}</p>
      <div class="content">
        <img
          :src="message.image"
          :alt="message.image"
          v-if="message.image != null"
        /><br />
        {{ message.content }}
      </div>
      <!--Chemin d'accès aux commentaires du message-->
      <div class="com">
        <router-link class="one-message" :to="'/oneMessage/' + message.id">
        <i class="far fa-comments"></i>Voir les commentaires</router-link>
      </div>
      <!--Bouton de suppression de message-->
      <div class="adminDelete" v-if="isAdmin == true">
        <deleteMessage :id="message.id" />
      </div>
    </div>
  </div>
</template>

<script>
import deleteMessage from "./deleteMessage";
let moment = require("moment");
let jwt = require("jsonwebtoken");
import axios from "axios";
export default {
  name: "loadMessages",
  components: {
    deleteMessage,
  },
  data() {
    return {
      moment: moment,
      token: "",
      userId: localStorage.getItem("id"),
      isAdmin: "",
      allMessages: [],
      idUsers: "",
      title: "",
      content: "",
      createAt: "",
    };
  },
  methods: {
    loadForum() {
      let token = localStorage.getItem("token");
      const SECRET_TOKEN ="vDi-7Ge>AaT}5im5C724VGf#V8%/$hvX7QDnHB5p}kVg7za9HCf-6&HT;.2!R49&+857rSjVXP{_8-zvyf2u.5KY$p}}9)]jk375";
      let decodedToken = jwt.verify(token, SECRET_TOKEN);
      console.log(decodedToken);
      axios
        .get("http://localhost:3000/api/messages/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.allMessages = res.data;
          console.log(res.data);
          this.isAdmin = decodedToken.isAdmin;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadForum();
  },
};
</script>

<style scoped>
@media (min-width: 50px) {
  .createdAt {
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
  .date {
    margin-left: 1rem;
  }
  .name {
    margin-left: 2.5rem;
  }
  .content {
    margin-bottom: 1rem;
    margin-left: 1rem;
  }
  .content img {
    width: 250px;
    margin-bottom: 0.75rem;
  }
  p {
    font-weight: 700;
    font-size: 1.5rem;
    margin: 1rem;
  }
  .com {
    text-align: right;
    margin-right: 2rem;
  }
  #message-card {
    margin: 1rem;
    border: solid #091F43;
    border-width: 2px;
    width: auto;
    color: #091F43;
    border-radius: 50px;
  }
  .far {
    margin-right: 0.25rem;
  }
}
@media (min-width: 800px) {
  .content img {
    width: 400px;
  }
  #message-card {
    margin-right: 3rem;
    margin-left: 3rem;
  }
}
</style>