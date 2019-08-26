const express = require('express');
const router = express.Router();
const ethereum = require('./ethereum');
const hash = "dev_hash" // file's hash for development // req.hash
const user = "dev_user" // user's account for development (JWT's User information) // req.account

router.get('/', function(req, res, next) {
    res.send('respond with a ethereum resource');
  });

//Content
router.get('/content/owner', function(req, res, next) {
    ethereum.getOwner(hash).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

router.get('/content/block', function(req, res, next) {
    ethereum.getBlockC(hash).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

router.get('/content/time', function(req, res, next) {
    ethereum.getTimeC(hash).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });
  
//User
router.get('/user/NOC', function(req, res, next) {
    ethereum.getNOC(user).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

router.get('/user/block', function(req, res, next) {
    ethereum.getBlockU(user).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

router.get('/user/time', function(req, res, next) {
    ethereum.getTimeU(user).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

router.get('/user/contents', function(req, res, next) {
    ethereum.getContents(user).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

