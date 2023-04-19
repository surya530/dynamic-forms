const initialValues ={
    allForms : []
};

const storeForms = (state=initialValues , action)=>{
    switch(action.type){
        case 'GET_FORMS':
            // state = {...state , allForms : action.data}
            return {...state , allForms : action.data};
        default:
            return state;
    }
}

export default storeForms;