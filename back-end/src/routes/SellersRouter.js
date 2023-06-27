const express = require('express');
const usersController = require('../controller/Users.controller');

const router = express.Router();

router.get('/', usersController.getSellers);
router.get('/:id', usersController.getSaleById);

module.exports = router;
