const axios = require('axios')
const jwt = require('jsonwebtoken')

exports.sendRequest = (method, route, data, token) => {
    return new Promise((resolve, reject) => {
        if(!route || !method){
            reject({
                error: "Missing data"
            })
            return null;
        }
        let headers = {"Accept": "application/json"}
        if(token){
            headers.Authorization = `Bearer ${token.access_token}`
        }
        axios({
            method: method,
            url: route,
            headers: headers,
            data: data,
        }).then((data)=>{
            if(data.data.error){
                reject(data.data);
                return;
            }
            resolve(data.data);
        }, (err) =>{
            reject(err);
            return;
        })
    })
}

exports.getGithubCrendials = () => {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.GITHUB_OAUTH;
    return {
        client_id: client_id,
        client_secret: client_secret 
    }
}

exports.validateJWT = (req) => {
    return new Promise((resolve, reject) => {
        let authHeader = req.headers['authorization']
        let token = authHeader && authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, token)=>{
            if(err){
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
}


exports.throwErr = (res, err) => {
    res.send({error: err.message});
}