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
        console.log(result)
        // result.redirect('/')//console.log(result);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.login  = (req, res, next) => {
    
    const { email, pw } = req.body
    const secret = req.app.get('jwt-secret');

    User.findOne({
        where : { email : email },
        include: { model : Directory } //left join
    }).then(user=>{
        // check user
        if(!user || user.pw!=pw){
            res.status(500).json({
                message : "invalid id or pw",
                success : false
            });
        } else{ //유저 정보 확인됐을 때
            new Promise((resolve, reject) =>{
                jwt.sign({
                    _id : user._id,
                    email : user.email,
                },
                secret,
                {
                    expiresIn : '7d',
                }, (err, token) => {
                    if(err) reject(err);
                    else resolve(token);
                });
            }).then(token=>{
                axios.post(`${cloud.keystoneUri}/v3/auth/tokens`, cloud.admin_info)
                .then(result =>{
                    res.json({
                        message : "success login",
                        token : token,
                        os_token : result.headers['x-subject-token'],
                        user_name : user.name,
                        dir : user.Directories,
                        success : true
                    })
                }).catch(err=>{
                    res.status(500).json({
                        message : "Fail get keystone admin auth"+err.message,
                    });
                })
                
            }).catch(err=>{
                console.log(err);
                res.status(500).json({
                    message : "fail create token",
                    success : false
                });
            });
        }
    }).catch(err=>{
        res.status(500).json({
            message : err.message
        })
    })
}