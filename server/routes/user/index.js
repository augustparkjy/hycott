var express = require('express');
const controller = require('./user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', controller._signUp)
router.post('/check/email', controller._checkEmail)
module.exports = router;
