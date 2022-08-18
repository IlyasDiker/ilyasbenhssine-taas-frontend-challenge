import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
    state: ()=> ({
        account: null,
        token: null
    }), 
    actions: {
        setToken(token){
            this.token = token;
        },
        registerAccount(account){
            this.account = account;
        },
        isAuthenticated(){
            return this.account ? true : false;
        },
        hasToken(){
            return this.token ? true : false;
        },
        logout(){
            this.account = null;
            this.token = null;
        }
    },
    persist:{
        enabled: true,
        strategies: [
            { storage: sessionStorage, paths: ['token'] },
        ],
    }
});