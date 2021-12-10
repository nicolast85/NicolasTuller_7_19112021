<template>
  <div>
    <nav id="nav">
      <img class=logo src="../assets/logo/icon-left-font.png" alt="logo" />
      <ul class="links">
        <li><router-link to="/forum" class="link"><i class="fas fa-globe"></i>Accueil</router-link></li>
        <li><router-link to="/profile" class="link"><i class="fas fa-user-circle"></i>Votre Profil</router-link></li>
        <li><a to="/login" class="link" v-on:click="Logout()">
        <i class="fas fa-exclamation-triangle"></i>Déconnexion</a></li>
      </ul>
    </nav>
    <h1>Forum</h1>
    <div>
      <newMessage />
    </div>
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
    width: 40%;
  }
</style>