const express = require('express');
const usersController = require('../controller/Users.controller');
const { TokenValidation } = require('../middlewares/TokenValidation');

const router = express.Router();

router.delete('/:id', TokenValidation, usersController.deleteUser);

module.exports = router;