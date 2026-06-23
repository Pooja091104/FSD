import axios from "axios";

export const getAllEmployees = (page, size) => {

    return async (dispatch) => {

        const response = await axios.get(
            `http://localhost:8080/api/employee/getallEmployee/v2?page=${page}&size=${size}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        );

        let action = {
            type: "GET_ALL_EMPLOYEES",
            payload: response.data.data,        // 👈 employees list
            pages: response.data.totalPages     // 👈 total pages
        };

        dispatch(action);
    };
};