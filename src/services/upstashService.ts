import axiosClient from "./axiosClient";
const upstashService = {
    login: async (param) => {
        const url ='UserRegMst/Login' ;
        return await axiosClient.post( url , param)
      },
}
export default upstashService
