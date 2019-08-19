var express = require('express');
var router = express.Router();
var controller = require('./auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', controller._signIn)
router.post('/signup', controller._signUp)
router.post('/check/email', controller._checkEmail)

module.exports = router;
