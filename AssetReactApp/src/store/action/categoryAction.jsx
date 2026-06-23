import axios from "axios"

const config={
     headers: {
        'Authorization': "Bearer " + localStorage.getItem('token')
    }
}
const getAllApi='http://localhost:8080/api/category/allCategory'
 export const getAll = () => {
    return async (dispatch) => { 
    const response =await axios.get(getAllApi,config)
    let action = {
        type : 'GET_ALL',
        payload: response.data
    }
    dispatch(action)
 }
}