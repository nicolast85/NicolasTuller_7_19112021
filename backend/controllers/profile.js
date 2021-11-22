// Besoin de notre model car on va enregistrer et lire des Models dans ses middlewares.
const models = require('../models');

// Package pour pouvoir créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

// Module dotenv pour éviter stocker des informations sensibles au sein de notre application
require('dotenv').config();

// Get /profile/:id :
// Méthode findOne() dans notre Models pour trouver le profile user unique ayant le même _id que le 
// paramètre de la requête. Ce profile user est ensuite retourné dans une Promise et envoyée au front-end,
// si aucun profile user n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, 
// avec l'erreur générée.
exports.getOneProfile = (req, res, next) => {
    models.User.findOne({
      attributes: [
            "id", 
            "email", 
            "name", 
            "firstname"
        ],
      where: { id: req.params.id },
    })
      .then((user) => {res.status(200).json(user);})
      .catch((error) => {
        res.status(404).json({error: error, message: 'Utilisateur non trouvé !',});
      });
  };

// Get /profile/:id/messages :
// Méthode findAll() dans notre Models afin de renvoyer un tableau contenant toutes les messages 
// d'un profile user choisi dans notre base de données.
exports.getAllMessagesProfile = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
  
    models.Message.findAll({
      order: [["updatedAt", "DESC"]],
      attributes: [
        "id",
        "idUsers",
        "title",
        "content",
        "image",
        "createdAt",
        "updatedAt",
      ],
      where: { idUsers: userId },
    })
      .then((messages) => {res.status(200).json(messages);})
      .catch((error) => {res.status(400).json({error: error,});});
  };

// Put /profile/:id : 
// On utilise la méthode findOne() pour trouver userId ayant le même id que notre requête
// On vérifie que l'auteur soit bien le meme que celui qui a fait la requête ou que se soit un Admin
// On doit remplir les champs Name et Firstname pour modifier le profile
exports.modifyProfile = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
  
    if (req.body.name == "" || req.body.firstname == "") {
      return res
        .status(400)
        .json({ error: 'Merci de remplir tous les champs !' });
    }
  
    models.User.findOne({
      where: { id: req.params.id },
    }).then((user) => {
      if (user.id === userId || isAdmin === true) {
        user
          .update({
            name: req.body.name,
            firstname: req.body.firstname,
          })
          .then(() => res.status(200).json({ message: 'Profile modifié !' }))
          .catch((error) => res.status(400).json({ error: 'Impossible de mettre à jour votre profile !' }));
        }
    });
  };

// Delete /profile/:id :
// On utilise la méthode findOne() pour trouver userId ayant le même id que notre requête
// On vérifie que l'auteur soit bien le meme que celui qui a fait la requête, ou que se soit un Admin
// Avec la méthode destroy, on supprime l'user
exports.deleteProfile = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
  
    models.User.findOne({
      where: { id: req.params.id },
    })
      .then((user) => {
        if (user.id === userId || isAdmin === true) {
          user
            .destroy()
            .then(() => {res.status(200).json({message: 'Utilisateur supprimé !',});})
            .catch((error) => {res.status(400).json({error: "L'utilisateur n'a pas pu être supprimé !",});});
        }
      })
      .catch((error) => {res.status(400).json({error: "L'utilisateur n'a pas pu être supprimé !",});});
  };