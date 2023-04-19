const initialValues = {
    users : []
};

const storeUsers = (state = initialValues , action) => {
    switch(action.type){
        case "GET_USERS":
            state = {...state , users : action.data};
            return state;
        default:
            return state;    
    }
}

export default storeUsers;