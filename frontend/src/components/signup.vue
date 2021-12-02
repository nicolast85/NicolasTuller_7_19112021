<template>
    <div class="signup">
    <h1>Inscription au forum Groupomania</h1>
    <form method="post" @submit.prevent="buttonSignup">
      <div>
        <label for="lastname"></label>
        <input type="text" id="nom" placeholder="Nom" v-model="lastname"/>
      </div>
      <div>
        <label for="firsname"></label>
        <input type="text" id="prénom" placeholder="Prénom" v-model="firstname"/>
      </div>
      <div>
        <label for="email"></label>
        <input type="email" id="email" placeholder="email@exemple.fr" v-model="email"/>
      </div>
      <div>
        <label for="password"></label>
        <input type="password" id="password-input" placeholder="Mot de passe" v-model="password"/>
      </div>
      <button type="submit" @click.prevent="buttonSignup">Inscription</button>
    </form>
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

</style>
