import { defineStore } from "pinia";

export const useLoginCheckStore = defineStore('check', {
    state: () => {
        return { isLogin: false, loginTime: {}, lastTime: {} }
    },
    getters: {
        getIsLogin: (state) => state.isLogin,
        getLoginTime: (state) => state.loginTime,
        getLastTime: (state) => state.lastTime,
      },
      actions: {
        setIsLogin(isLogin){
            this.isLogin = isLogin;            
        },
        setLoginTime(loginTime){
            if(loginTime){
                this.loginTime = loginTime;
            }else {
                this.loginTime = {}
            }
        },
        setLastTime(lastTime){
            if(lastTime){
                this.lastTime = lastTime;
            }else {
                this.lastTime = {}
            }
        },
    }
})