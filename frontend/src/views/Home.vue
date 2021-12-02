<template>
  <div>
    <nav id="nav">
      <img class=logo src="../assets/logo/icon-left-font.png" alt="logo" />
      <ul class="links">
        <li>
          <router-link to="/login">Se connecter</router-link>
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
  
</style>
