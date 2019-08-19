const User = require('../../models').User;
const jwt = require('jsonwebtoken');
const axios = require('axios');
const crypto = require('crypto');

exports._checkEmail = (req, res) => {
    const email = req.body.email;
    User.count({
        where : {email : email}
    }).then(result => {
        res.json({
            count : result
        })
    }).catch(err => {
        res.status(500).json({
            message : err.message,
            success: false
        });
    });
}

exports._signUp = (req, res)=>{
    
    const { email, pw, name, age } = req.body;
    const salt = Math.round((new Date().valueOf()*Math.random()))+"";
    const hashPw = crypto.createHash("sha512").update(pw+salt).digest("hex");

    User.create({
        email: email,
        pw : hashPw,
        name : name,
        age: age,
        salt: salt
    })
    .then(result=>{
        res.json({
            message: 'done'
        })
    })
    .catch(err => {
        res.json({
            message: 'error'
        });
    })
}

exports._signIn  = (req, res) => {
    
    const { email, pw }  = req.body
    const secret = req.app.get('jwt-secret');
    const _checkInfo = (user) => {
        const salt = user.salt
        const hashPw = crypto.createHash("sha512").update(pw + salt).digest("hex")
        if(!user || user.pw!=hashPw) throw new Error("Cannot find that user")
        else{
            const p = new Promise((resolve, reject) => {
                jwt.sign(
                    {
                        email: user.email
                    }, 
                    secret, 
                    {
                        expiresIn: '7d'
                    }, (err, token) => {
                        if (err) reject(err)
                        resolve(token) 
                    })
            })
            return p
        }
    }

    const _checkResult = (token) => {
        res.status(200).json({
            message : "Sign in successed",
            token : token,
            success: true
        })
    }

    const _catchError = (error) =>{
        res.status(401).json({
            message: error
        })
    }

    User.findOne({
        where : { email : email }
    })
    .then(_checkInfo)
    .then(_checkResult)
    .catch(_catchError)
}