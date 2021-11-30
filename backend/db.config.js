const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "gpmdb21",
    database: "GroupomaniaDB"
});

// Test de la connection

connection.connect(
    function(err) {
        if (err) {
            console.log("Connexion à la base de donnée échouée");
            throw err;
        } else {
            console.log("Connexion à la base de donnée réussie !");
        }
    });
module.exports = connection;