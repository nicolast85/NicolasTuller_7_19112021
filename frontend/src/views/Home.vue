<template>
  <div>
    <nav id="nav">
      <img src="../assets/logo/icon.png" alt="logo" />
      <ul class="links">
        <li>
          <router-link to="/login">Se connecter</router-link>
        </li>
      </ul>
    </nav>
    <register />
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
