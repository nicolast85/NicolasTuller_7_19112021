// Package pour pouvoir vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

const SECRET_TOKEN ="vDi-7Ge>AaT}5im5C724VGf#V8%/$hvX7QDnHB5p}kVg7za9HCf-6&HT;.2!R49&+857rSjVXP{_8-zvyf2u.5KY$p}}9)]jk375"
//const SECRET_TOKEN="SECRET_TOKEN"
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
// - dans le cas contraire, tout fonctionne et notre utilisateur est authentifié. 
// Nous passons l'exécution à l'aide de la fonction next() .
module.exports = (req, res, next) => {
   console.log("req",req.headers);
   try {
    const token = req.headers.authorization.split(' ')[1];
    console.log("token",token)
    //const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const verifyToken = jwt.verify(token, SECRET_TOKEN);
    console.log("verifyToken",verifyToken)

    const userId = verifyToken.userId;
    const isAdmin = verifyToken.isAdmin; // --- verifytoken n'existe pas fait très attention sur le nommage des variables dans ce cas c'est un T majuscule
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