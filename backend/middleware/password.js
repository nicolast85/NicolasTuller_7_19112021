// Utilisation de Password-Validator
const passwordValidator = require('password-validator');
 
// Creation du schéma
const passwordSchema = new passwordValidator();
 
// Add properties to it
passwordSchema
.is().min(8)                                    // Taille minimum 8 caractères
.is().max(20)                                   // Taille maximum 20 caractères
.has().uppercase()                              // Doit avoir une majuscule
.has().lowercase()                              // Doit avoir une minuscule
.has().digits()                                 // Doit avoir un chiffre
.has().not().spaces()                           // Ne contient pas d'espace
.is().not().oneOf(['Passw0rd', 'Password123']); // Mot de passe interdit

// Si passwordSchema n'est pas valide alors on a un message d'erreur :
// Le mot de passe doit faire 8 caractères au moins, avec une majuscule, une minuscule et un chiffre au moins.
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ error: 'Le mot de passe doit faire 8 caractères au moins, avec une majuscule, une minuscule et un chiffre au moins.' });
    } else {
        next();
    }
 };