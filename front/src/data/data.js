const { sendRequest } = require('@/data/api');

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