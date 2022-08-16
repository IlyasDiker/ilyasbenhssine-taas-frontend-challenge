const { default: axios } = require("axios");

exports.getAuthLink = () => {
    const base_url = "https://github.com/login/oauth/authorize"
    const client_id = process.env.VUE_APP_CLIENT_ID;
    let scopes = "repo:status"
    let url = `${base_url}?client_id=${client_id}&scope=${scopes}`;
    return url;
}

exports.authorizeClient = (code) => {
    return new Promise((resolve, reject) => {
        const client_id = process.env.VUE_APP_CLIENT_ID;
        const client_secret = process.env.VUE_APP_GITHUB_OAUTH;
        axios({
            method:'post',
            url:'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
            headers: {"Accept": "application/json"},
            data:{
                client_id: client_id,
                client_secret: client_secret,
                code: code
            }
        }).then((res)=>{
            resolve(res.data);
        }, (err) =>{
            reject(err);
        })
    })
}

exports.getClientUser = (token) => {
    return new Promise((resolve, reject) => {
        axios({
            method:'get',
            url:'https://cors-anywhere.herokuapp.com/https://api.github.com/user',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            }
        }).then((res)=>{
            resolve(res.data);
        }, (err) =>{
            reject(err);
        })
    })
}

exports.getRepositories = (token, page, sort) => {
    return new Promise((resolve, reject) => {
        axios({
            method:'get',
            url:`https://cors-anywhere.herokuapp.com/https://api.github.com/user/repos?page=${page}${sort ? '&sort='+sort : ''}`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            }
        }).then((res)=>{
            resolve(res.data);
        }, (err) =>{
            reject(err);
        })
    })
}

exports.getBranches = (token, repo_full_name, page) => {
    return new Promise((resolve, reject) => {
        axios({
            method:'get',
            url:`https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${repo_full_name}/branches?page=${page ?? 1}&per_page=100`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            }
        }).then((res)=>{
            resolve(res.data);
        }, (err) =>{
            reject(err);
        })
    })
}

exports.getCommits = (token, repo_full_name, page) => {
    return new Promise((resolve, reject) => {
        axios({
            method:'get',
            url:`https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${repo_full_name}/commits?page=${page ?? 1}`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            }
        }).then((res)=>{
            resolve(res.data);
        }, (err) =>{
            reject(err);
        })
    })
}