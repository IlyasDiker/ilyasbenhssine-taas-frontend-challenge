const { sendRequest } = require('@/data/api');

exports.authorizeClient = (code) => {
    return new Promise((resolve, reject) => {
        sendRequest('post', '/auth', {
            code: code
        }, false).then((res)=>{
            resolve(res);
        }, (err) =>{
            reject(err);
        })
    })
}

exports.getAuthLink = () => {
    const base_url = "https://github.com/login/oauth/authorize"
    const client_id = process.env.VUE_APP_CLIENT_ID;
    let scopes = "repo:status"
    let url = `${base_url}?client_id=${client_id}&scope=${scopes}`;
    return url;
}