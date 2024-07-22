import axios from "./axiosClient"

const HandlerLogin = (data) => {
    return axios.post('/UserRegMst/Login', data)
}

const HandlerRegister = (data) => {
    return axios.post('/UserRegMst/AddAccount', data)
}

const HandlerVerify = (code) => {
    return axios.get(`/UserRegMst/Action?code=${code}`)
}

const HandleLogout = (username) => {
    return axios.get(`/UserRegMst/Logout?name=${username}`)
}

export {
    HandlerLogin,
    HandlerRegister,
    HandlerVerify,
    HandleLogout
} 