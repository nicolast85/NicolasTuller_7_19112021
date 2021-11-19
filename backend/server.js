// Import du package HTTP natif de Node et l'utilisez pour créer un serveur, en passant une fonction 
// qui sera exécutée à chaque appel effectué vers ce serveur.
const http = require('http');
// Import Application 
const app = require('./app');

// Import du package Cors (Cross-origin resource sharing : permettre à un agent utilisateur d'accéder à des ressources 
// d'un serveur situé sur une autre origine que le site courant)
const cors = require('cors');
app.use(cors())

// La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

// Indique sur quel port va tourner notre application
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// La fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est 
// ensuite enregistrée dans le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// La méthode createServer() prend en argument la fonction qui sera appelée à chaque requête reçu par le
// serveur, ici les fonctions seront dans app.js.
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Ecouteur d'évènements consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
server.listen(port);