// Besoin de notre model car on va enregistrer et lire des Models dans ses middlewares.
const models = require('../models');

// Package pour pouvoir créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

// Module dotenv pour éviter stocker des informations sensibles au sein de notre application
require('dotenv').config();

// Import du module XSS pour empêcher les faille de type cross-site scripting (XSS)
const xss = require('xss')

// Get /comments :
// Méthode findAll() dans notre Models afin de renvoyer un tableau contenant toutes les comments
// dans notre base de données.
exports.getAllComments = (req, res, next) => {
    models.Comment.findAll({
      attributes: [
        "id",
        "idUsers",
        "idMessages",
        "comment",
        "createdAt",
        "updatedAt",
      ],
      where: {
        idMessages: req.params.id,
      },
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: models.User,
          attributes: ["name", "firstname"],
        },
      ],
    })
      .then((comments) => {res.status(200).json(comments);})
      .catch((error) => {res.status(400).json({error: error,});});
  };

// Post /comment :
// On vérifie que l'utilisateur ait bien les autorisations pour poster son commentaire
// On lui demande de remplir le champs du commentaire sinon error 400
// Utilisation du module XSS sur le champs à remplir pour prévenir des attaques XSS.
exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
  
    if (req.body.comment === "") {
      return res
        .status(400)
        .json({ error: 'Merci de remplir le champ commentaire.' });
    }
  
    models.Comment.create({
      idUsers: userId,
      idMessages: req.params.id,
      comment: xss(req.body.comment),
    })
      .then(() => res.status(200).json({ message: 'Commentaire enregistré !' }))
      .catch((error) => res.status(500).json(error));
  };

// Delete /comment/:id :
// On vérifie que l'auteur soit bien le meme que celui qui a fait la requête, ou que se soit un Admin
exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
  
    models.Comment.findOne({
      where: {
        idMessages: req.params.idMessages,
        id: req.params.id,
      },
    }).then((comment) => {
      if (comment.idUsers === userId || isAdmin === true) {
        comment
          .destroy()
          .then(() => {
            res.status(200).json({message: 'Commentaire supprimé !',});
          })
          .catch((error) => {
            res.status(400).json({error: error, message: "Le commentaire n'a pas pu être supprimé",});
          });
      }
    });
  };