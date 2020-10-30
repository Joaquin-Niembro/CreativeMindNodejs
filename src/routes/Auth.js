const express = require('express');
const router = express.Router();
const Authorization = require('../middlewares/Authorization');
const { signin, isVerified } = require('../controllers/AuthController');

router.post('/signin', signin);

router.get('/auth', [Authorization], isVerified);

module.exports = router;
