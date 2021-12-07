<template>
    <div id="app">
    <router-view />
    <footer>
      <p class="trade">Copyright © 2021 Tous droits réservés <br>
      <i class="fas fa-globe"></i> Groupomania <a href="#CGU" title="Conditions d'utilisations">
        <i class="fas fa-gavel"></i>Mentions légales</a></p>
      <a aria-label="logo Twitter" class="social" href="#TwitterGroupomania" title="Twitter de Groupomania">
        <i class="fab fa-twitter"></i></a>
      <a aria-label="logo Facebook" class="social" href="#FacebookGroupomania" title="Facebook de Groupomania">
        <i class="fab fa-facebook"></i></a>
      <a aria-label="logo Linkedin" class="social" href="#LinkedinGroupomania" title="Linkedin de Groupomania">
        <i class="fab fa-linkedin-in"></i></a>
      <a aria-label="logo Instagram" class="social" href="#InstagramGroupomania" title="Instagram de Groupomania">
      <i class="fab fa-instagram"></i></a>
    </footer>
    </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
    }
  }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,600;0,700;1,600&display=swap');

#app {
  font-family: 'Josefin Sans', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #091F43;
  background-image: url("./assets/logo/icon.png");
  font-size: 1.25rem;
}
.fab {
  margin-right: 1.5rem;
  margin-bottom: 0.5rem;
}
.fas {
  margin-right: 0.25rem;
}
.trade {
  margin-bottom: 0.5rem;
  margin-top: 5rem;
}
.trade .fas {
  padding-top: 0.5rem;
}
.logo {
    width: 40%;
  }
a {
  text-decoration: none;
  color: #091F43;
}
a:hover {
  text-decoration: underline;
  color: #D1515A;
}
button {
  border-radius: 75px;
  background-color: #091F43;
  color: #FFD7D7;
  border-color: #091F43;
  box-shadow: 5px 5px 5px #fff;
  padding: 3px 13px 3px 13px;
  font-size: 1rem;
  font-weight: 700;
}
button:hover {
  background-color: #D1515A;
  color: #fff;
  border-color: #D1515A;
  box-shadow: 5px 5px 5px #D1515A;
}
textarea {
  padding: 0.5rem;
}
textarea, input {
  border-radius: 10px;
  border-color: #091F43;
  color: #091F43;
  font-family: 'Josefin Sans';
}
input {
  padding: 3px 13px 3px 13px;
  font-family: 'Josefin Sans';
}
</style>
