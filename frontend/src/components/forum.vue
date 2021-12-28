<template>
  <div>
    <!--Logo-->
    <nav id="nav">
      <img class=logo src="../assets/logo/icon-left-font.png" alt="logo" />
      <!--Menu de navigation-->
      <ul class="links">
        <li><a to="/signup" class="link" title="Revenir à l'écran d'Inscription" v-on:click="Logout()">
        <i class="fas fa-exclamation-triangle"></i>Déconnexion</a></li>
        <li><router-link to="/profile" class="link" title="Aller sur votre Profil"><i class="fas fa-user-circle">
          </i>Votre Profil</router-link></li>
      </ul>
    </nav>
    <!--Bannière-->
    <h1>Forum</h1>
    <div class="rule">
      <p>Bienvenue sur le Forum Groupomania,<br >
      merci de suivre les règles et nos conditions d'utilisations.</p>
    </div>
    <!--Création de nouveau message-->
    <div>
      <newMessage />
    </div>
    <!--Chargement des messages du forum-->
    <div>
      <loadMessages />
    </div>
  </div>
</template>


<script>
import loadMessages from "./loadMessages";
import newMessage from "./newMessage";
export default {
  name: "forum",
  components: {
    loadMessages,
    newMessage,
  },
  data() {
    return {
      token: "",
      allMessages: [],
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
@media (min-width: 50px) {
  li {
    cursor : pointer;
    text-decoration: none;
    text-align-last: right;
    margin-right: 1rem;
    list-style-type: none;
    margin-top: 0.5rem;
  }
  li>a {
    text-decoration: none;
  }
  .link:hover {
    text-decoration: underline;
  }
  .logo {
    width: 80%;
    }
  .rule {
    margin: 1rem;
    padding: 0.5rem;
    border: solid #FD2D01;
    width: auto;
    color: #091F43;
    border-radius: 50px;
    font-weight: 700;
  }
}
@media (min-width: 800px) {
    .logo {
      width: 80%
    }
    .rule {
      margin-right: 4rem;
      margin-left: 4rem;
    }
  }
</style>