<template>
  <div>
    <nav id="nav">
      <ul class="links">
        <li>
          <router-link to="/forum">Retour</router-link>
        </li>
      </ul>
    </nav>
    <div>
    <h2>Profile</h2>
      <p> <u>E-mail</u>: {{ dataProfile.email }}
      </p>
      <p>
        <u>Nom et prénom</u>: {{ dataProfile.lastname }} {{ dataProfile.firstname }}
      </p>
    </div>
    <form method="post" @submit.prevent="updateProfile">
      <div>
        <label for="lastname"></label>
        <input type="lastname" id="lastname" placeholder="Nom" v-model="lastname" />
      </div>
      <div>
        <label for="firstname"></label>
        <input type="firstname" id="firstname" placeholder="Prénom" v-model="firstname"/>
      </div>
      <button type="submit" @click.prevent="updateProfile">Modifier</button>
    </form>
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
    <button class="deletebtn" type="submit" @click.prevent="deleteProfile">Supprimer mon compte</button>
    <h4>Tout mes messages</h4>
    <div class="my-messages">
      <div class="my-message" v-for="myMessage in messagesProfile" :key="myMessage.id">
        <h3>{{ myMessage.title }}</h3>
        <img :src="myMessage.image" :alt="myMessage.image" v-if="myMessage.image != null"/><br />
        <p>{{ myMessage.content }}</p>
        <deleteMessage :id="myMessage.id" />
      </div>
    </div>
  </div>
</template>


<script>
import deleteMessage from "./deleteMessage";
import axios from "axios";
export default {
  name: "profile",
  components: {
    deleteMessage,
  },
  props: {
    id: Number,
  },
  data() {
    return {
      token: "",
      error: "",
      userId: "",
      dataProfile: [],
      messagesProfile: [],
      email: "",
      lastname: "",
      firstname: "",
    };
  },
  methods: {
    loadProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .get("http://localhost:3000/api/auth/profile/" + userId, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.dataProfile = res.data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    loadMessagesProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .get("http://localhost:3000/api/auth/profile/" + userId + "/messages", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.messagesProfile = res.data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    updateProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      const data = {
        lastname: this.lastname,
        firstname: this.firstname,
      };
      axios
        .put("http://localhost:3000/api/auth/profile/" + userId, data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre profil a bien été mis à jour !");
          document.location.reload();
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
    deleteProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .delete("http://localhost:3000/api/auth/profile/" + userId, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre compte a été supprimé !");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadProfile();
    this.loadMessagesProfile();
  },
};
</script>

<style scoped>

</style>