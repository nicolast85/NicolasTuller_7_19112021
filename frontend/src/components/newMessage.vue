<template>
  <div class="forum">
    <form method="post" @submit.prevent="buttonNewMessage">
      <h2>Envoyez un message <i class="far fa-envelope"></i></h2>
      <!--Formulaire d'envoie de message-->
      <div>
        <label for="title"></label>
        <input class="title" type="text" id="title" placeholder="Votre titre !" v-model="title" />
      </div>
      <div class="content">
        <label for="content"></label>
        <textarea
          id="content"
          placeholder=" Votre message !"
          rows="6"
          cols="40"
          v-model="content"
        />
      </div>
      <!--Bouton de séléction d'image à envoyer-->
      <div id="join">
        <label class="selection" for="File">(Sélectionnez l'image à uploader [JPG,PNG,GIF])<br >
          <i class="fas fa-file-import"></i></label>
        <input type="file" id="File" ref="file" accept=".jpg, .jpeg, .png, .gif"  @change="selectFile()" />
      </div>
      <!--Bouton d'envoie de message-->
      <button type="submit" @click.prevent="buttonNewMessage"><i class="fas fa-paper-plane" ></i>Envoyez</button>
      <!--error-->
      <div class="error" v-if="error">
        {{ error.error }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
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
        console.log(data);
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
button, #join, #content {
  margin-top: 0.5rem;
}
button {
  font-size: 2rem;
}
.selection {
  font-style: italic;
}
.error {
  font-size: 13px;
  background-color: #FD2D01;
  color: #000;
  margin: 20px;
  padding: 10px;
}
.title {
  padding: 3px 13px 3px 13px;
  border: solid #091F43;
  border-width: 2px;
  margin: 0px;
  width: auto;
  background-color: #fff;
  color: #091F43;
  width: 40%;
}
.title:hover {
  background-color: #fff;
  color: #091F43;
}
input {
  border: solid;
  text-decoration: none;
  margin-bottom: 20px;
  width: 50%;
  background-color: #EFEFEF;
  color: #091F43;
  font-family: 'Josefin Sans';
}
input:hover {
  background-color: #D1515A;
  color: #fff;
}
.inputfile {
  position:relative;
  color: #FFD7D7;
  background-color: #091F43;
  display: inline-block;
  cursor: pointer;
  padding:5px 10px;
  margin-right:5px;
  border-radius: 10px;
}
.inputfile input {
  position: absolute;
  left:-9999px;
  z-index: -1;
}
.inputfile input:focus,
.inputfile:hover {
  background-color: #D1515A;
  color:#fff;
}
</style>