import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return { isAuthenticated: false, user: {}, userName: {}, isAdmin: 0 }
    },
    getters: {
        getAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
        getUserName: (state) => state.userName,
        getIsAdmin: (state) => state.isAdmin,
      },
      actions: {
        setAuth(isAuth){
            this.isAuthenticated = isAuth;            
        },
        setUser(user){
            if(user){
                this.user = user;
            }else {
                this.user = {}
            }
        },
        setUserName(userName){
            if(userName){
                this.userName = userName;
            }else {
                this.userName = {}
            }
        },
        setUserId(userId){
            if(userId){
                this.userId = userId;
            }else {
                this.userId = {}
            }
        },
        setIsAdmin(isAdmin){
            if(isAdmin){
                this.isAdmin = isAdmin;
            }else {
                this.isAdmin = {}
            }
        },
    }
})