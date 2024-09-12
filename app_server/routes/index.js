var express = require('express');
var router = express.Router();

const cntrlMain = require('../controllers/main');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Get the home page*/ 
router.get('/', ctrlMain.index);


module.exports = router;
