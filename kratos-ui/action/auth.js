const { default: axios } = require("axios")
const { ENV } = require("../utils/config")


const getSession=()=>{
    return new Promise(async(resolve)=>{
        axios.get(`${ENV.KRATOS_HOST}/sessions/whoami`, {
            withCredentials:true
        }).then((res)=>{
            resolve({
                flag:true,
                data:res.data
            })
        }).catch((err)=>{
            resolve({
                flag: false,
                err: err
            })
        })
    })
}

const getLogoutToken=()=>{
    return new Promise(async(resolve)=>{
        axios.get(`${ENV.KRATOS_HOST}/self-service/logout/browser`, {
            withCredentials:true
        })
        .then((res)=>{
            resolve({
                flag: true,
                token : res.data.logout_token
            })
        })
        .catch((err)=>{
            resolve({
                flag: false
            })
        })
    })
}

const logoutToken=()=>{
    return new Promise(async(resolve)=>{
        const token = await getLogoutToken();
        if(token.flag){
            axios.get(`${ENV.KRATOS_HOST}/self-service/logout?token=${token.token}`, {
                withCredentials: true
            })
            .then((res)=>{
                resolve({flag: true})
            })
            .catch((err)=>{
                resolve({flag:false})
            })
        }
    })
}

module.exports = {getSession, logoutToken}