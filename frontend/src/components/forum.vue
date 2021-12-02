<template>
  <div>
    <nav id="nav">
      <img src="../assets/logo/icon.png" alt="logo" />
      <ul class="links">
        <li><router-link to="/forum">Accueil</router-link></li>
        <li><router-link to="/profile">Profil</router-link></li>
        <li><a to="/login" v-on:click="Logout()">Déconnexion</a></li>
      </ul>
    </nav>
    <h2>Forum</h2>
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
}

li>a {
  text-decoration: none;
}

li:hover {
  text-decoration: underline;
}

</style>