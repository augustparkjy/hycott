var express = require('express');
var router = express.Router();
var controller = require('./auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', )
router.post('/signout', )

module.exports = router;
