const express = require('express');
const router = express.Router();
const controller = require('./auth');
const middleContoller = require('../middleware/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', controller._signIn)
router.post('/signup', controller._signUp)
router.post('/check/email', controller._checkEmail)
router.use('/check', middleController)
router.get('/check', controller._check)

module.exports = router;
