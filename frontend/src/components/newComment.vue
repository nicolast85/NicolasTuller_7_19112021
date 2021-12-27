<template>
  <div>
    <!--Structure du commentaire-->
    <form method="post" @submit.prevent="buttonNewComment">
      <div>
        <label for="comment"></label>
        <input
          type="text"
          id="comment"
          placeholder="Commentaire"
          v-model="comment"
        />
      </div>
      <!--Bouton d'envoie de commentaire-->
      <button type="submit" @click.prevent="buttonNewComment">
      <i class="far fa-comment"></i> Envoyez votre commentaire
      </button>
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
  name: "newComment",
  props: {
    id: Number,
  },
  data() {
    return {
      comment: "",
      error: "",
    };
  },
  methods: {
    buttonNewComment() {
      const data = {
        comment: this.comment,
      };
      let token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3000/api/messages/" + this.id + "/comment/",
          data,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          console.log(res);
          this.$router.push("/oneMessage/" + this.id);
          document.location.reload();
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 1rem;
}
input {
  width: 66%;
  height: 4rem;
  font-size: 1.5rem;
}
</style>