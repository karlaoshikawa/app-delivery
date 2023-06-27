const express = require('express');
const usersController = require('../controller/Users.controller');
const { validateEmailAndPassword } = require('../middlewares/LoginValidation');

const router = express.Router();

router.post('/', validateEmailAndPassword, usersController.getUserByEmail);

module.exports = router;