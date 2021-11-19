// Création d'un routeur Express qui contiendra la logique de nos routes
const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/commentControllers');
// Import du middleware Auth
const auth = require('../middleware/auth');

router.get('/:id/comments', auth, commentCtrl.getAllComments);
router.post('/:id/comment/', auth, commentCtrl.createComment);
router.delete('/:idMessages/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;