// backend/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.create);
router.get('/', itemController.findAll);
router.get('/:id', itemController.findById);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);

module.exports = router;
