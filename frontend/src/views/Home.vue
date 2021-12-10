<template>
  <div>
    <nav id="nav">
      <img class=logo src="../assets/logo/icon-left-font.png" alt="logo" />
      <ul class="links">
        <li>
          <router-link to="/login" class="title" title="Déjà inscrits ? Connectez vous !">
          <i class="fas fa-wifi"></i>Se connecter</router-link>
        </li>
      </ul>
    </nav>
    <signup />
  </div>
</template>

<script>
import signup from "../components/signup";
export default {
  name: "Home",
  components: {
    signup,
  },
};
</script>

<style scoped>
  li {
    text-align-last: right;
    margin-right: 1rem;
    list-style-type: none;
  }
  li a {
    text-decoration: none;
  }
  .title:hover {
    text-decoration: underline;
  }
</style>
