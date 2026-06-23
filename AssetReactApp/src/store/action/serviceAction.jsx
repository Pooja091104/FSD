import axios from "axios";

export const getAllServices = (page = 0, size = 5) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/service/all/v2?page=${page}&size=${size}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            console.log("SERVICE RESPONSE:", response.data);

            dispatch({
                type: "GET_ALL_SERVICES",
                payload: response.data.data,
                pages: response.data.totalPages
            });

        } catch (error) {
            console.log("Service fetch error:", error);
        }
    };
};