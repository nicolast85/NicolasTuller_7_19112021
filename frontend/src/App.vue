<template>
    <div id="app">
    <router-view />
    <footer>
      <p class="trade">Copyright © 2021 Tous droits réservés <br><i class="fas fa-globe"></i> Groupomania</p>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("./assets/logo/icon.png");
}
.fab {
  margin-right: 1.5rem;
  margin-bottom: 0.5rem;
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
</style>
