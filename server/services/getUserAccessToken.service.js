const { getClientId, getGithubOAuth, getJwtSecret } = require("../config/config");
const { sendRequest } = require("../api/sendRequest");
const jwt = require('jsonwebtoken');

exports.getUserAccessToken = (code) => {
    return new Promise((resolve, reject)=>{
        let client_id = getClientId();
        let client_secret = getGithubOAuth();
        let jwt_secret = getJwtSecret();
        if(!client_id || !client_secret || !jwt_secret){
            reject({message: "Missing ENV Variables"});
            return;
        }
        sendRequest('post', 'https://github.com/login/oauth/access_token', {
            client_id: client_id,
            client_secret: client_secret,
            code: code
        })
        .then((data)=>{
            let token = jwt.sign(data, jwt_secret);
            resolve(token);
        }, (err) =>{
            reject(err);
        })
    })
}