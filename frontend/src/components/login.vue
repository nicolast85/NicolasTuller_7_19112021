<template>
  <div class="login">
    <nav id="nav">
      <img src="../assets/logo/icon-left-font.png" alt="logo"/>
      <ul class="links">
        <li>
          <router-link to="/">S'enregistrer</router-link>
        </li>
      </ul>
    </nav>
    <h2>Connection au forum Groupomania</h2>
    <form method="post" @submit.prevent="buttonLogin">
      <div>
        <label for="email"></label>
        <input type="email" placeholder="email@exemple.fr" v-model="email"/>
      </div>
      <div>
        <label for="password"></label>
        <input type="password" placeholder="Mot de passe" v-model="password"/>
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      token: "",
      email: "",
      password: "",
      userId: "",
      error: "",
    };
  },
  methods: {
    async buttonLogin() {
      await axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.userId);
          }
          this.$router.push("/forum");
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
  },
};
</script>

<style scoped>

</style>