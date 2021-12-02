<template>
  <div class="forum">
    <form method="post" @submit.prevent="buttonNewMessage">
      <h2>Envoyer un message <i class="far fa-paper-plane"></i></h2>
      <div>
        <label for="title"></label>
        <input type="title" id="title" placeholder="Titre" v-model="title" />
      </div>
      <div>
        <label for="content"></label>
        <textarea
          type="text"
          id="content"
          placeholder="Votre message !"
          rows="6"
          cols="40"
          v-model="content"
        />
      </div>
      <div>
        <label for="File">(Facultatif)</label><br />
        <input type="file" ref="file" @change="selectFile()" />
      </div>
      <button type="submit" @click.prevent="buttonNewMessage">Envoyer</button>
      <div class="error" v-if="error">
        {{ error.error }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "newMessage",
  data() {
    return {
      title: "",
      content: "",
      file: null,
      error: "",
    };
  },
  methods: {
    buttonNewMessage() {
      let token = localStorage.getItem("token");
      const data = new FormData();
      if (this.file !== null) {
        data.append("title", this.title);
        data.append("content", this.content);
        data.append("image", this.file, this.file.name);
      } else {
        data.append("title", this.title);
        data.append("content", this.content);
      }
      axios
        .post("http://localhost:3000/api/messages/", data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre message a bien été envoyé !");
          document.location.reload();
          this.$router.push("/forum");
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style scoped>

</style>