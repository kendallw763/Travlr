var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel');

/**  Get the travel page*/
router.get('/', controllers.travel)

module.exports = router;