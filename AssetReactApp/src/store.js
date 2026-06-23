import { configureStore } from "@reduxjs/toolkit";
import { employeeReducer } from "./store/reducer/employeeReducer";
import { categoryReducer } from "./store/reducer/CategoryReducer";

import { serviceReducer } from "./store/reducer/serviceReducer";
export const store = configureStore({
    reducer: {
        employees : employeeReducer,
        categories : categoryReducer,
    
        services : serviceReducer,
        
    }
})