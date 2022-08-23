let utils = require('../api/utils');
const jwt = require('jsonwebtoken');
const { getUserAccessToken } = require('../services/getUserAccessToken.service');

exports.auth = async (req, res) => {
    let body = req.body;
    if(!body.code){
        res.send({error: "No code was provided"})
        return;
    }
    getUserAccessToken(code).then((data)=>{
        res.send({
            token: data
        })
    }, (err) =>{
        res.send({
            error: err
        })
    })
}