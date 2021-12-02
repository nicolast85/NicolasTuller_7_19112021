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
          <i class="user-name"
            >{{ comment.User.lastname }} {{ comment.User.firstname }}</i
          ><br />
          <strong>{{ comment.comment }}</strong><br />
          <i class="date">{{ moment(comment.createdAt).fromNow() }}</i>
        </div>
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
      let decodedToken = jwt.verify(token, "SECRET_TOKEN");
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

</style>