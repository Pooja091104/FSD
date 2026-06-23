const initialState={
    categories: []
}
export const categoryReducer=(state = initialState,action)=>{
    if(action.type === 'GET_ALL'){
        return{
            ...state,
            categories : action.payload
        }
    }
    return state

}