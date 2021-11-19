// Création d'un routeur Express qui contiendra la logique de nos routes
const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/messageControllers');

// Import du middleware Auth
const auth = require('../middleware/auth');
// Import du middleware Multer
const multer = require('../middleware/multer-config');

router.get("/", auth, messageCtrl.getAllMessage);
router.get("/:id", auth, messageCtrl.getOneMessage);
router.post("/", auth, multer, messageCtrl.createMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);
router.post("/:id/like", auth, messageCtrl.likeDislikeMessage);

module.exports = router;