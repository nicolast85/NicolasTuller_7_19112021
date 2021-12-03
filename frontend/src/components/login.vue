<template>
  <div class="login">
    <nav id="nav">
      <img class="logo" src="../assets/logo/icon-left-font.png" alt="logo"/>
      <ul class="links">
        <li>
          <router-link to="/"><i class="fas fa-file-signature"></i> S'enregistrer</router-link>
        </li>
      </ul>
    </nav>
    <h2>Connection au forum Groupomania</h2>
    <form method="post" @submit.prevent="buttonLogin">
      <div class="field">
        <label for="email"></label><i class="fas fa-at"></i>
        <input type="email" placeholder="email@exemple.fr" v-model="email"/>
      </div>
      <div class="field">
        <label for="password"></label><i class="fas fa-key"></i>
        <input type="password" placeholder="Mot de passe" v-model="password"/>
      </div>
      <button type="submit"><i class="fas fa-wifi"></i> Se connecter</button>
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
  li {
    text-align-last: right;
    margin-right: 1rem;
    list-style-type: none;
  }
  li a {
    text-decoration: none;
  }
  li:hover {
    text-decoration: underline;
  }
  .field {
    margin-bottom: 0.25rem;
  }
  .fas {
    margin-right: 00.25rem;
  }
  button {
    margin-top: 0.5rem;
  }
  .logo {
    width: 40%;
  }
</style>