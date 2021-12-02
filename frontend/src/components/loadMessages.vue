<template>
  <div class="forum">
    <div id="message-card" v-for="message in allMessages" :key="message.id">
      <h1 class="title">{{ message.title }}</h1>
      <div class="content">
        <img
          :src="message.image"
          :alt="message.image"
          v-if="message.image != null"
        /><br />
        {{ message.content }}
      </div>
      <div class="createdAt">
        <i>{{ moment(message.createdAt).fromNow() }}</i>
        <i>{{ message.User.lastname }} {{ message.User.firstname }}</i>
      </div>
      <div>
        <router-link class="one-message" :to="'/oneMessage/' + message.id">Voir les commentaires</router-link
        >
      </div>
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
      let decodedToken = jwt.verify(token, "SECRET_TOKEN");
      axios
        .get("http://localhost:3000/api/messages/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.allMessages = res.data;
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

</style>