var express = require('express');
var router = express.Router();

var hospitalRoutes = require('./hospitalRoutes');
var authRoutes = require('../auth/AuthController');

router.use('/hospitals', hospitalRoutes)
router.use('/auth', authRoutes)

module.exports = router;
