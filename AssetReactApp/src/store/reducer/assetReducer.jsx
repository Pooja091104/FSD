const initialState = {
    assets: [],
    totalpages: 0
};

export const assetReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_ALL_ASSETS":
            return {
                ...state,
                assets: action.payload,
                totalpages: action.pages
            };

        default:
            return state;
    }
};

export default assetReducer;