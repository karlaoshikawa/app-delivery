const express = require('express');
const usersController = require('../controller/Users.controller');
const { validateEmailAndPassword } = require('../middlewares/LoginValidation');
const { NameValidation } = require('../middlewares/NameValidation');

const router = express.Router();

router.post('/', validateEmailAndPassword, NameValidation, usersController.createdUser);

module.exports = router;