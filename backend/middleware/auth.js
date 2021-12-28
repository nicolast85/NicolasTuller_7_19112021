// Package pour pouvoir vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

// Module dotenv pour éviter stocker des informations sensibles au sein de notre application
require('dotenv').config();

// Extration du token du header Authorization de la requête entrante. Il contiendra également 
// le mot-clé Bearer . Utilisation de la fonction split pour récupérer tout après l'espace dans 
// le header. Les erreurs générées ici s'afficheront dans le bloc catch.
// Utilisation de la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur
// sera générée 
// Extraction de l'ID utilisateur de notre token, si la demande contient un ID utilisateur nous le comparons à celui 
// extrait du token :
// - s'ils sont différents, nous générons une erreur
// - dans le cas contraire, on vérifie s'il possède le statue Admin, 
// - si tout fonctionne, notre utilisateur est authentifié. 
// Nous passons l'exécution à l'aide de la fonction next().
module.exports = (req, res, next) => {
   console.log("req",req.headers);
   try {
    const token = req.headers.authorization.split(' ')[1];
    console.log("token",token)
    const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log("verifyToken",verifyToken)
    const userId = verifyToken.userId;
    const isAdmin = verifyToken.isAdmin;
   //vérifie si userId correspond à celui du token si ok next
    if (req.body.userId && req.body.userId !== userId) {
      console.log("Excecution 1")
      throw 'Invalid user ID';
    } else if (req.body.isAdmin && req.body.isAdmin !== isAdmin) {
      console.log("Excecution 2")
      throw 'Not Admin';
    } else {
      console.log("Excecution")
      next();
    }
  } catch (e) {
    console.log("Excecution 3", e)
    res.status(401).json({
      error: new Error('Requête non authentifiée!')
    });
  }
};