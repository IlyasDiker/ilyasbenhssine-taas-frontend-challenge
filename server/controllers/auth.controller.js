let utils = require('../utils');
const jwt = require('jsonwebtoken')

exports.auth = async (req, res) => {
    let body = req.body;
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.GITHUB_OAUTH;
    if(!body.code){
        res.send({error: "No code was provided"})
        return;
    }
    utils.sendRequest('post', 'https://github.com/login/oauth/access_token', {
        client_id: client_id,
        client_secret: client_secret,
        code: body.code
    }).then((data)=>{
        let token = jwt.sign(data, process.env.JWT_SECRET);
        res.send({
            token: token
        })
    }, (err) =>{
        res.send({
            error: err
        })
    })
}