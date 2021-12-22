<template>
  <div>
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
      <button type="submit" @click.prevent="buttonNewComment">
      <i class="fas fa-comments"></i> Envoyer votre commentaire
      </button>
    </form>
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
}
</style>