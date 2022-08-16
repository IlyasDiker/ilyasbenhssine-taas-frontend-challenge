const { default: axios } = require("axios");

const API_URL = process.env.VUE_APP_API_URL;

exports.getAuthLink = () => {
    const base_url = "https://github.com/login/oauth/authorize"
    const client_id = process.env.VUE_APP_CLIENT_ID;
    let scopes = "repo:status"
    let url = `${base_url}?client_id=${client_id}&scope=${scopes}`;
    return url;
}

exports.authorizeClient = (code) => {
    return new Promise((resolve, reject) => {
        axios({
            method:'post',
            url:`${API_URL}/api/auth`,
            headers: {"Accept": "application/json"},
            data:{
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
            url:`${API_URL}/api/user`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
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
            url:`${API_URL}/api/repositories?page=${page}${sort ? '&sort='+sort : ''}`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((res)=>{
            resolve(res.data);
        }, (err) =>{
            reject(err);
        })
    })
}

exports.getBranches = (token, repo_full_name) => {
    return new Promise((resolve, reject) => {
        axios({
            method:'get',
            url:`${API_URL}/api/branches?repo=${repo_full_name}&per_page=100`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
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
            url:`${API_URL}/api/commits?repo=${repo_full_name}&page=${page ?? 1}`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((res)=>{
            resolve(res.data);
        }, (err) =>{
            reject(err);
        })
    })
}