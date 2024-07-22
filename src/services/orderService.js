import axios from "./axiosClient"

const getProductById = (id) => {
    return axios.get(`Product/FindOneId?id=${id}`)
}


export {
    getProductById,
} 