const { sendRequest } = require("../api/sendRequest");

exports.getRepositoriesList = async (token, page, sort) => {
    return new Promise((resolve, reject)=>{
        sendRequest('get', `https://api.github.com/user/repos?page=${page}${sort ? '&sort='+sort : ''}`, null, token)
        .then((data)=>{
            resolve(data);
        }, (err) =>{
            reject(err);
        })
    })
}