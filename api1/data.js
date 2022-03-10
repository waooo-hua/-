import axios from "./axios"

export const getMenu =(param)=>{
    return axios.request({
        url:'/permiss/getMenu',
        method:'post',
        data:param
    })
}