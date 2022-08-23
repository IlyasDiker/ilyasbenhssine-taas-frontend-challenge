const { sendRequest } = require("../api/utils");

exports.getBranchCommitsList = async (token, repo, page) => {
    return new Promise((resolve, reject)=>{
        sendRequest('get', `https://api.github.com/repos/${repo}/commits?page=${page ?? 1}`, null, token)
        .then((data)=>{
            resolve(data);
        }, (err) =>{
            reject(err);
        })
    })
}