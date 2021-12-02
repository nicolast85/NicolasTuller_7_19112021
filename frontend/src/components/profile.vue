<template>
  <div>
    <nav id="nav">
      <img class=logo src="../assets/logo/icon-left-font.png" alt="logo" />
      <ul class="links">
        <li>
          <router-link to="/forum"><i class="fas fa-arrow-circle-left"></i> Retour</router-link>
        </li>
        <li>
          <router-link to="/login" v-on:click="Logout()">
          <i class="fas fa-exclamation-triangle"></i> Déconnexion</router-link>
        </li>
      </ul>
    </nav>
    <div>
    <h1>Profil</h1>
      <p> 
        <u><i class="fas fa-at"></i> Mail </u>: {{ dataProfile.email }}
      </p>
      <p>
        <u><i class="fas fa-users"></i> Nom </u>: {{ dataProfile.lastname }}
      </p>
      <p>
        <u><i class="fas fa-user"></i> Prénom </u>: {{ dataProfile.firstname }}
      </p>
    </div>
    <h2>Modifier votre profil :</h2>
    <form method="post" @submit.prevent="updateProfile">
      <div>
        <label for="lastname"></label>
        <input type="lastname" id="lastname" placeholder="Nom" v-model="lastname" />
      </div>
      <div>
        <label for="firstname"></label>
        <input type="firstname" id="firstname" placeholder="Prénom" v-model="firstname"/>
      </div>
      <button type="submit" @click.prevent="updateProfile">
        <i class="fas fa-exclamation"></i> Modifier votre profil</button>
    </form>
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
    <button class="deletebtn" type="submit" @click.prevent="deleteProfile">
      <i class="fas fa-skull-crossbones"></i> Supprimer votre compte</button>
    <h2>Tous vos messages :</h2>
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
  Logout() {
      localStorage.clear();
      this.$router.push("/");
    },
};

</script>

<style scoped>
  li {
    text-align-last: right;
    margin-right: 1rem;
    list-style-type: none;
    margin-top: 0.5rem;
  }
  li a {
    text-decoration: none;
  }
  li:hover {
    text-decoration: underline;
  }
  .logo {
    width: 40%;
  }
  p {
    text-align : left;
    margin-left : 1rem;
  }
  u {
    text-decoration: none;
  }
  form div {
    padding-bottom: 0.5rem;
  }
  button {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
</style>