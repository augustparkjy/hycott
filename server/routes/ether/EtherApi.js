const express = require('express');
const router = express.Router();
const ethereum = require('./ethereum');
const hash = "dev_hash" // file's hash for development // req.hash
const user = "dev_user" // user's account for development (JWT's User information) // req.account



// GET
// Root
router.get('/', function(req, res, next) {
    res.send('respond with a ethereum resource');
    next;
  });

//Content
router.get('/content/owner/:hash', function(req, res, next) {
    let hash = req.params
    ethereum.getOwner(hash).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

router.get('/content/block/:hash', function(req, res, next) {
    let hash = req.params
    ethereum.getBlockC(hash).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

router.get('/content/time/:hash', function(req, res, next) {
    let hash = req.params
    ethereum.getTimeC(hash).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });
  
//User
router.get('/user/NOC/:user', function(req, res, next) {
    let user = req.params
    ethereum.getNOC(user).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

router.get('/user/block/:user', function(req, res, next) {
    let user = req.params
    ethereum.getBlockU(user).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

router.get('/user/time/:user', function(req, res, next) {
    let user = req.params
    ethereum.getTimeU(user).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

router.get('/user/contents/:user', function(req, res, next) {
    let user = req.params
    ethereum.getContents(user).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

//POST
router.post('/user/register/', function(req, res, next){
    ethereum.registerUser(req.body.user).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  });

router.post('/content/register/:hash', function(req, res, next){
    let hash = req.params
    let owner = req.body.user
    let ether = req.body.ether
    ethereum.registerCopyright(owner,hash,ether).then(response=>{
      res.send(response)
    }).catch(res.send(err))
    next;
  })
  


