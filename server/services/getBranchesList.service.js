const { sendRequest } = require("../api/sendRequest");

exports.getBranchesList = async (token, repo) => {
    return new Promise((resolve, reject)=>{
        sendRequest('get', `https://api.github.com/repos/${repo}/branches?per_page=100`, null, token)
        .then((data)=>{
            resolve(data);
        }, (err) =>{
            reject(err);
        })
    })
}