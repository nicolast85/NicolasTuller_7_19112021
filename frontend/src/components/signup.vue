<template>
    <div class="signup">
    <!--Bannière-->
    <h1>Inscription au forum Groupomania</h1>
    <h2>Pas encore inscrits ?</h2>
    <!--Formulaire d'inscription au Forum Groupomania-->
    <form method="post" @submit.prevent="buttonSignup">
      <div class="field">
        <label for="lastname"></label><i class="fas fa-users"></i>
        <input type="text" id="lastname" placeholder="Nom" v-model="lastname"/>
      </div>
      <div class="field">
        <label for="firsname"></label><i class="fas fa-user"></i>
        <input type="text" id="firsname" placeholder="Prénom" v-model="firstname"/>
      </div>
      <div class="field">
        <label for="email"></label><i class="fas fa-at"></i>
        <input type="email" id="email" placeholder="email@exemple.fr" v-model="email"/>
      </div>
      <div class="field">
        <label for="password"></label><i class="fas fa-key"></i>
        <input type="password" id="password" placeholder="Mot de passe" v-model="password"/>
      </div>
      <!--Bouton d'inscription-->
      <button type="submit" title="Pas encore inscrits ? Remplissez le formulaire !" @click.prevent="buttonSignup">
        <i class="fas fa-file-signature"></i>Inscription</button>
    </form>
    <!--error-->
      <div class="error" v-if="error">
        {{ error.error }}
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "signup",
  data() {
    return {
      email: "",
      lastname: "",
      firstname: "",
      password: "",
      error: "",
    };
  },
    methods: {
    async buttonSignup() {
      const data = {
        email: this.email,
        lastname: this.lastname,
        firstname: this.firstname,
        password: this.password,
      };
      await axios
        .post("http://localhost:3000/api/auth/signup", data)
        .then((res) => {
          console.log(res);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
  },
}; 
</script>

<style scoped>
.field {
  margin-bottom: 0.25rem;
}
.fas {
  margin-right: 0.25rem;
}
button {
  cursor: pointer;
  margin-top: 0.5rem;
}
input {
  margin-bottom: 0.5rem;
}
.error {
  color: #FD2D01;
  margin-top: 0.5rem;
}
</style>
