const initialState = {
    employees: [],
    totalpages: 0
};

export const employeeReducer = (state = initialState, action) => {

    switch (action.type) {

        case "GET_ALL_EMPLOYEES":
            return {
                ...state,
                employees: action.payload,
                totalpages: action.pages
            };

        default:
            return state;
    }
};