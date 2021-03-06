// Besoin de notre model car on va enregistrer et lire des Models dans ses middlewares.
const models = require('../models');

// Package de chiffrement bcrypt pour hasher le password
const bcrypt = require('bcrypt');

// Package pour pouvoir créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

// Module dotenv pour éviter stocker des informations sensibles au sein de notre application
require('dotenv').config();

// Nos routes d'authentification :
// ------------------------------
// Fonction de hachage de bcrypt dans notre mot de passe pour « saler » le mot de passe 10 fois. Plus la valeur 
// est élevée, plus l'exécution de la fonction sera longue mais plus le hachage sera sécurisé.
// Il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré :
// dans notre bloc then, nous créons un utilisateur et l'enregistrons dans la base de données, en renvoyant 
// une réponse de réussite en cas de succès, et des erreurs avec le code d'erreur en cas d'échec.
exports.signup = (req, res, next) => { 
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = models.User.create({
          email: req.body.email,
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          password: hash,
          isAdmin: false,
        })        
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
};

// Utilisation du modèle User pour vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur
// existant de la base de données : 
// - dans le cas contraire, nous renvoyons une erreur 401 Unauthorized
// - si l'e-mail correspond à un utilisateur existant, nous continuons :
// Utilisation de la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec
// le hash enregistré dans la base de données :
// - s'ils ne correspondent pas, nous renvoyons une erreur 401 Unauthorized et un message « Mot de passe
// incorrect ! » ;
// - s'ils correspondent, les informations d'identification de notre utilisateur sont valides. Dans ce cas, 
// nous renvoyons une réponse 200 contenant l'ID utilisateur et un token.
// Utilisation de la fonction sign de jsonwebtoken pour encoder le token, ce token contient l'ID de 
// l'utilisateur en tant que payload (les données encodées dans le token), on vérifie s'il est admin
// nous utilisons une chaîne secrète de développement temporaire SECRET_TOKEN pour encoder notre token, nous
// définissons la durée de validité du token à 24 heures avec expiresIn. L'utilisateur devra donc se reconnecter 
// au bout de 24 heures.

exports.login = (req, res, next) => {
    models.User.findOne({ 
      where: { email: req.body.email, },
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            lastname: user.lastname,
            firstname: user.firstname,
            token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, 
              process.env.SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};