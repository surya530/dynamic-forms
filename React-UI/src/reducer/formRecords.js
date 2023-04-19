const initialValues = {
    allRecords : []
};

const storeRecords = (store=initialValues , action)=>{
    switch(action.type){
        case 'GET_RECORDS':
            return {...store , allRecords : action.data};
        default:
            return store;
    }
}

export default storeRecords;