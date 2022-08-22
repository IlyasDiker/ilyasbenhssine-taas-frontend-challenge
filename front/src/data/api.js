const { useAccountStore } = require("@/stores/account");
const { default: axios } = require("axios");

const API_URL = process.env.VUE_APP_API_URL;

exports.getAuthLink = () => {
    const base_url = "https://github.com/login/oauth/authorize"
    const client_id = process.env.VUE_APP_CLIENT_ID;
    let scopes = "repo:status"
    let url = `${base_url}?client_id=${client_id}&scope=${scopes}`;
    return url;
}

const sendRequest = (method, url, data, authorization = false) =>{
    return new Promise((resolve, reject)=>{
        let headers = {"Accept": "application/json"};
        if(authorization){
            let accountStore = useAccountStore();
            if(!accountStore.token){
                reject();
                return;
            }
            headers.Authorization = `Bearer ${accountStore.token}`
        }
        axios({
            method: method,
            url: `${API_URL}/api${url}`,
            headers: headers,
            data: data
        }).then((res)=>{
            resolve(res.data);
        }, (err) =>{
            reject(err);
        })
    })
}

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

exports.getClientUser = () => {
    return new Promise((resolve, reject) => {
        sendRequest('get', '/user', null, true)
        .then((res)=>{
            resolve(res);
        }, (err) =>{
            reject(err);
        })
    })
}

exports.getRepositories = (page, sort) => {
    return new Promise((resolve, reject) => {
        sendRequest('get', `/repositories?page=${page}${sort ? '&sort='+sort : ''}`, null, true)
        .then((res)=>{
            resolve(res);
        }, (err) =>{
            reject(err);
        })
    })
}

exports.getBranches = (repo_full_name) => {
    return new Promise((resolve, reject) => {
        sendRequest('get', `/branches?repo=${repo_full_name}&per_page=100`, null, true)
        .then((res)=>{
            resolve(res);
        }, (err) =>{
            reject(err);
        })
    })
}

exports.getCommits = (repo_full_name, page, sha) => {
    return new Promise((resolve, reject) => {
        sendRequest('get',`/commits?repo=${repo_full_name}&page=${page ?? 1}${sha ? '&sha='+sha : ''}`, null, true)
        .then((res)=>{
            resolve(res);
        }, (err) =>{
            reject(err);
        })
    })
}

exports.getSearchRepositories = (query, user) => {
    if(!query || !user) return;
    return new Promise((resolve, reject) => {
        sendRequest('get',`/search?q=${query}${user ? '%20user:'+user : ''}`, null, true)
        .then((res)=>{
            resolve(res);
        }, (err) =>{
            reject(err);
        })
    })
}