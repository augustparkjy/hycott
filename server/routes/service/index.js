const express = require('express');
const router = express.Router();
const controller = require('./service');
// const middleContoller = require('../middleware/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/AllContents', controller._getAllContents)
router.post('/newContents', controller._addContents)
// router.get('/check', middleContoller)
// router.get('/check', controller._check)

module.exports = router;
