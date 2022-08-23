const { sendRequest } = require("../api/utils");

exports.searchUserRepositories = async (token, query) => {
    return new Promise((resolve, reject)=>{
        sendRequest('get', `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`, null, token)
        .then((data)=>{
            resolve(data);
        }, (err) =>{
            reject(err);
        })
    })
}