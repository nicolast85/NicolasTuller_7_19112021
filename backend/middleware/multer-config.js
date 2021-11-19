// Package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

// Dictionnaire :
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

// Création de la constante storage, à passer à multer comme configuration, qui contient la logique nécessaire
// pour indiquer à multer où enregistrer les fichiers entrants. La fonction destination indique à multer 
// d'enregistrer les fichiers dans le dossier images, la fonction filename indique à multer d'utiliser le nom
// d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de 
// fichier. Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier
// appropriée.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Exportation ensuite l'élément multer entièrement configuré, on lui passe notre constante storage et on lui 
// indique que nous gérerons uniquement les téléchargements de fichiers image.
module.exports = multer({storage: storage}).single('image');