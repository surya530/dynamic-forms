const initialValues ={
    allFields : []
};

const storeFields = (state=initialValues , action)=>{
    switch(action.type){
        case 'GET_FIELDS':
            return {...state , allFields : action.data};
        default:
            return state;
    }
}

export default storeFields;