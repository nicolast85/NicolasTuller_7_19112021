const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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