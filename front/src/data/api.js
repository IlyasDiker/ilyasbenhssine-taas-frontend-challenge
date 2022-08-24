const { useAccountStore } = require("@/stores/account");
const { default: axios } = require("axios");

const API_URL = process.env.VUE_APP_API_URL;

exports.sendRequest = (method, url, data, authorization = false) =>{
    return new Promise((resolve, reject)=>{
        if(!method || !url){
            reject({error:'Missing params'});
        }
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