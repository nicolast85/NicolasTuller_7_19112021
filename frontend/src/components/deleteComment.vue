<template>
  <!--Bouton suppression de commentaire-->
  <div>
    <button type="submit" @click.prevent="deleteComment">
      <i class="fas fa-comment-slash"></i> Supprimez le commentaire</button>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "deleteComment",
  props: {
    idComm: Number,
  },
  data() {
    return {
      token: "",
      isAdmin: "",
      id: this.$route.params.id,
    };
  },
  methods: {
    deleteComment() {
      let token = localStorage.getItem("token");
      axios
        .delete(
          "http://localhost:3000/api/messages/" + this.id + "/comment/" + this.idComm,{
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          alert("Votre commentaire a bien été supprimé !");
          document.location.reload();
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
};
</script>

<style scoped>
button {
  text-align: right;
  margin-bottom: 0.5rem;
}
</style>