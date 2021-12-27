<template>
  <div>
    <nav id="nav">
      <!--Logo-->
      <img class=logo src="../assets/logo/icon-left-font.png" alt="logo" />
      <!--Menu de navigation-->
      <ul class="links">
        <li><router-link to="/login" class="link" title="Déconnexion" v-on:click="Logout()">
          <i class="fas fa-exclamation-triangle"></i>Déconnexion</router-link></li>
        <li><router-link to="/forum" class="link" title="Retour au forum">
        <i class="fas fa-reply"></i>Retour</router-link></li>
      </ul>
    </nav>
    <!--Bannière-->
    <div>
    <h1>Profil</h1>
    <div class="welcome">
      <p>Bienvenue dans votre profil <strong>{{ dataProfile.firstname }}</strong></p>
    </div>
    <!--Données du profil-->
      <div class="info">
        <p>Information :</p>
      </div>
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
    <!--Formulaire de modification de profil-->
    <h2>Modifiez votre profil :</h2>
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
        <i class="fas fa-exclamation"></i>Modifiez votre profil</button>
    </form>
    <!--error-->
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
    <!--Bouton de suppression de profil-->
    <button class="deletebtn" type="submit" @click.prevent="deleteProfile">
      <i class="fas fa-user-slash"></i>Supprimez votre compte</button>
    <!--Messages d'un utilisateur-->
    <h2>Tous vos messages :</h2>
    <div class="my-messages">
      <div class="my-message" v-for="myMessage in messagesProfile" :key="myMessage.id">
        <h3>{{ myMessage.title }}</h3>
        <img :src="myMessage.image" :alt="myMessage.image" v-if="myMessage.image != null"/><br />
        <p>{{ myMessage.content }}</p>
        <div class="com">
          <router-link class="one-message" :to="'/oneMessage/' + myMessage.id">
          <i class="far fa-comments"></i>Voir les commentaires</router-link>
        </div>
        <!--Bouton de suppression de message-->
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
          console.log(res.data);
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
@media (min-width: 50px) {
  li {
    text-align-last: right;
    margin-right: 1rem;
    list-style-type: none;
    margin-top: 0.5rem;
  }
  li a {
    text-decoration: none;
  }
  .link:hover {
    text-decoration: underline;
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
  u {
    font-weight: 700;
  }
  .my-message {
    margin: 1rem;
    padding: 0.5rem;
    border: solid #091F43;
    border-width: 2px;
    width: auto;
    color: #091F43;
    border-radius: 50px;
  }
  .deletebtn {
    float: right;
    margin-right: 1rem;
    margin-top: 2rem;
  }
  h2 {
    margin-top: 5rem;
  }
  .my-message > img {
    width: 250px;
  }
  .com {
    text-align: right;
    margin-right: 1rem;
  }
  .far {
    margin-right: 0.25rem;
  }
  .welcome {
    display: flex;
    justify-content: center;
  }
  .welcome strong {
    font-size: 1.5rem;
  }
  .info {
    font-weight: 700;
  }
}
@media (min-width: 800px) {
  .my-message > img {
    width: 400px;
  }
  .my-message {
    margin-right: 3rem;
    margin-left: 3rem;
  }
}
</style>