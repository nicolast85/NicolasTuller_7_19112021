<template>
  <div>
    <nav id="nav">
      <img src="../assets/logo/icon.png" alt="logo" />
      <ul class="links">
        <li><router-link to="/forum">Accueil</router-link></li>
        <li><router-link to="/profile"> Profil</router-link></li>
        <li><a to="/login" v-on:click="Logout()"> Déconnexion</a></li>
      </ul>
    </nav>
    <h2>Forum</h2>
    <div>
      <newMessage />
    </div>
    <div>
      <loadMessages />
    </div>
  </div>
</template>


<script>

</script>

<style scoped>

</style>