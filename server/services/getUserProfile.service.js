const { sendRequest } = require("../api/utils");

exports.getUserProfile = (token) => {
    return new Promise((resolve, reject)=>{
        sendRequest('get', 'https://api.github.com/user', null, token)
        .then((data)=>{
            resolve(data);
        }, (err) =>{
            reject(err);
        })
    })
}