const express = require('express');
const usersController = require('../controller/Users.controller');

const router = express.Router();

router.get('/', usersController.getAllExcludeAdm);

module.exports = router;
