import axios from "axios";

export const getAllAssets = (page = 0, size = 5) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/com/Asset/all/v2?page=${page}&size=${size}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );
            
               console.log("FULL RESPONSE:", response.data);
            console.log("DATA ARRAY:", response.data.data);
            dispatch({
                type: "GET_ALL_ASSETS",
                payload: response.data.data,
                pages: response.data.totalPages
                
            });

        } catch (error) {
            console.log("Asset fetch error:", error);
        }
    };
};