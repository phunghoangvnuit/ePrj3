import axios from "../axios";

const getAllProducts = (pageIndex, pageSize) => {
    return axios.get(`api/Product/FindAll?account_name=admin&page=${pageIndex}&pageSize=${pageSize}`, {
    })
}


const deleteProduct = (data) => {
    return axios.delete(`api/Product/DeleteProduct`, {
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const getProductbyCategory = (data, pageIndex, pageSize) => {
    return axios.post(`api/Product/FindAllProductCategory?page=${pageIndex}&pageSize=${pageSize}`,
        data

    )
}

const createProduct = (data) => {
    return axios.post(`api/Product/AddProduct`,
        JSON.stringify(data),
    )
}

const editProduct = (data) => {
    return axios.put(`api/Product/EditProduct?id=${data.id}&name=admin`, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export {
    getAllProducts,
    deleteProduct,
    createProduct,
    editProduct,
    getProductbyCategory
}