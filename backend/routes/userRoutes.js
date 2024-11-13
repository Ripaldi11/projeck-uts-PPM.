// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/:id', userController.findById);
router.post('/login', userController.login);

module.exports = router;
