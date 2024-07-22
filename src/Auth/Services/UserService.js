import axios from "../axios";

const getAllUsers = (pageIndex, pageSize) => {
    return axios.get(`api/UserRegMst/FindAll?page=${pageIndex}&pageSize=${pageSize}`, {
    })
}

const addUser = (pageIndex, pageSize) => {
    return axios.get(`api/UserRegMst/AddAccount`, {
    })
}

const deleteUser = (data) => {
    return axios.delete(`api/UserRegMst/DeleteAccount`, {
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}



export {
    getAllUsers,
    deleteUser
}