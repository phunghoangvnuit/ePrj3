import axios from "../axios";

const getAllCategories = (pageIndex, pageSize) => {

    return axios.get(`api/Category/FindAll?page=${pageIndex}&pageSize=${pageSize}`, {
    })
}

const CreateCategory = (data) => {
    return axios.post(`/api/Category/AddCategory`, data)
}

const DeleteCategory = (data) => {
    return axios.delete('/api/Category/DeleteCategory', {
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const EditCategory = (data) => {
    return axios.put(`api/Category/UpdateCategory?id=${data.id}&name=admin`,data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export {
    getAllCategories,
    CreateCategory,
    DeleteCategory,
    EditCategory
}