<template>
    <div id="app">
    <router-view />
    <footer>
      <p>Copyright © 2021 Tous droits réservés, Groupomania</p>
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
}
</style>
