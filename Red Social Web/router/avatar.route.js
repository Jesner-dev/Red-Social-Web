const express = require('express');
const router  = express.Router();
const {obtenerAvatars} = require('../controller/avatar.controller');

router.get('/', obtenerAvatars);
module.exports = router;