const initialState = {
    services: [],
    totalpages: 0
};

export const serviceReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_ALL_SERVICES":
            return {
                ...state,
                services: action.payload,
                totalpages: action.pages
            };

        default:
            return state;
    }
};

export default serviceReducer;