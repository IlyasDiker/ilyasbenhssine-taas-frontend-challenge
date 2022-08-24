const axios = require('axios')

exports.sendRequest = (method, route, data, token) => {
    return new Promise((resolve, reject) => {
        if(!route || !method){
            reject({
                error: "Missing data"
            })
            return null;
        }
        let headers = {"Accept": "application/json"}
        if(token){
            headers.Authorization = `Bearer ${token.access_token}`
        }
        axios({
            method: method,
            url: route,
            headers: headers,
            data: data,
        }).then((data)=>{
            if(data.data.error){
                reject(data.data);
                return;
            }
            resolve(data.data);
        }, (err) =>{
            reject(err);
            return;
        })
    })
}
