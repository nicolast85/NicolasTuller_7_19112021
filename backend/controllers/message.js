// Besoin de notre model car on va enregistrer et lire des Models dans ses middlewares.
const models = require('../models');

// Package pour pouvoir créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

// Import du package "file system" de Node qui donne accès aux fonctions qui nous permettent de modifier
// le système de fichiers, y compris aux fonctions permettant de supprimer les fichiers.
const fs = require('fs');

// Import du module XSS pour empêcher les faille de type cross-site scripting (XSS)
const xss = require('xss')

// Module dotenv pour éviter stocker des informations sensibles au sein de notre application
require('dotenv').config();

// Get /messages :
// Méthode findAll() dans notre Models afin de renvoyer un tableau contenant toutes les messages 
// dans notre base de données.
exports.getAllMessage = (req, res, next) => {
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
      include: [
        {
          model: models.User,
          attributes: ["name", "firstname"],
        },
      ],
    })
      .then((messages) => {res.status(200).json(messages);})
      .catch((error) => {res.status(400).json({error: error,});
      });
  };

// Get /messages/:id :
// Méthode findOne() dans notre Models pour trouver le message unique ayant le même _id que le 
// paramètre de la requête. Ce message est ensuite retournée dans une Promise et envoyée au front-end,
// si aucun message n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, 
// avec l'erreur générée.
exports.getOneMessage = (req, res, next) => {
    models.Message.findOne({
      attributes: [
        "id",
        "idUsers",
        "title",
        "content",
        "image",
        "createdAt",
        "updatedAt",
      ],
      where: { id: req.params.id },
    })
      .then((message) => {res.status(200).json(message);})
      .catch((error) => {res.status(404).json({error: error,});
      });
  };

// Post /message :
// On vérifie que l'utilisateur ait bien les autorisations pour poster son message
// On lui demande de remplir les champs Titre et Content sinon error 400
// Utilisation du module XSS pour tous les champs à remplir pour prévenir des attaques XSS.
// Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment
// filename . Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ). Nous 
// ajoutons '://' , puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ). 
// Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL.
exports.createMessage = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
  
    if (req.body.title === "" || req.body.content === "") {
      return res.status(400).json({ error: 'Merci de remplir tous les champs.' });
    }
  
    models.Message.create({
      idUsers: userId,
      title: xss(req.body.title),
      content: xss(req.body.content),
      image:
        req.body.content && req.file
          ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          : null,
    })
      .then(() => res.status(201).json({ message: 'Message enregistré !' }))
      .catch((error) => res.status(400).json({ error }));
  };

// Delete /message/:id :
// On vérifie que l'auteur soit bien le meme que celui qui a fait la requête, ou que se soit un Admin
// Nous utilisons l'ID que nous recevons comme paramètre pour accéder au message correspondant dans la base de
// données. Nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer 
// le nom de fichier. Nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier, en lui
// passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé, dans le callback, 
// nous implémentons la logique d'origine, en supprimant le message de la base de données. De même si le message
// ne contient pas d'image, sinon une erreur est remontée.
exports.deleteMessage = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
  
    models.Message.findOne({
      where: { id: req.params.id },
    })
      .then((message) => {
        if (message.idUsers === userId || isAdmin === true) {
          if (message.image !== null) {
            const filename = message.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              message
                .destroy()
                .then(() => res.status(200).json({ message: 'Message supprimé !' }))
                .catch((error) => res.status(400).json({ error }));
            });
          } else {
            message
              .destroy()
              .then(() => {res.status(200).json({message: 'Message supprimé !',});
              })
              .catch((error) => {res.status(400).json({error: error,message: "Le message n'a pas pu être supprimé",});
              });
          }
        }
      })
      .catch((error) => {res.status(400).json({error: error,});
      });
  };

exports.likeDislikeMessage = (req, res, next) => {
    // Déclararion des variables nécessaires
    let like = req.body.like
    let userId = req.body.userId
    let messageId = req.params.id
    
    // L'instruction switch évalue une expression et, selon le résultat obtenu et le cas associé, exécute les
    // instructions correspondantes.
    switch (like) {
      case 1 :
          /// Ajout d'un Like pour une messageId précise en fonction de l'userId
          models.Message.updateOne({ id: messageId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
            .then(() => res.status(200).json({ message: `J'aime` }))
            .catch((error) => res.status(400).json({ error }))
        // L'instruction break permet de terminer la boucle en cours ou l'instruction switch en cours 
        // et de passer le contrôle du programme à l'instruction suivant l'instruction terminée.   
        break;
      
      case 0 :
          models.Message.findOne({ id: messageId })
             .then((message) => {
      // Suppression d'un Like pour un messageId précis en fonction de l'userId si message.usersLiked existe
              if (message.usersLiked.includes(userId)) { 
                models.Message.updateOne({ id: messageId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
                  .then(() => res.status(200).json({ message: `Suppression de J'aime` }))
                  .catch((error) => res.status(400).json({ error }))
              }
      // Suppression d'un DisLike pour un messageId précis en fonction de l'userId si message.usersDisLiked existe
              if (message.usersDisliked.includes(userId)) { 
                models.Message.updateOne({ id: messageId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
                  .then(() => res.status(200).json({ message: `Suppression de Je n'aime pas` }))
                  .catch((error) => res.status(400).json({ error }))
              }
            })
            .catch((error) => res.status(404).json({ error }))
        break;
      // Ajout d'un DisLike pour un messageId précis en fonction de l'userId
      case -1 :
          models.Message.updateOne({ id: messageId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
            .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
            .catch((error) => res.status(400).json({ error }))
        break;
        
        default:
          console.log(error);
    }
  }