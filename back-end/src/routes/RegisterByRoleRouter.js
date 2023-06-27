const express = require('express');
const usersController = require('../controller/Users.controller');
const { validateEmailAndPassword } = require('../middlewares/LoginValidation');
const { NameValidation } = require('../middlewares/NameValidation');
const { TokenValidation } = require('../middlewares/TokenValidation');

const router = express.Router();

router.post(
'/', 
validateEmailAndPassword, 
TokenValidation,
NameValidation, 
usersController.createdUserByRole,
);

module.exports = router;
