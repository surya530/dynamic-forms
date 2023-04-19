import axios from "axios";
import { converRecordesIntoRow, recordTableRows } from "../helpDocument/helper";

// get forms
export const getForms = () => (dispatch) => {
    return axios.get('/getForms').
        then((e) => {
            dispatch({
                type: 'GET_FORMS',
                data: e.data
            })
        }).
        catch((err) => { }).
        finally(() => { })
}

// create form
export const createForm = (formName, callBack) => (dispatch) => {
    return axios.post('/createForm', { formName }).
        then((e) => {
            const { status } = e;
            callBack(status)
        }).
        catch((err) => {
            const { status } = err.response;
            callBack(status);
        }).
        finally(() => { })
}

// getFields
export const getFields = (_id) => (dispatch) => {
    return axios.post('/getFields', { _id }).
        then((e) => {
            const { data } = e
            dispatch({
                type: 'GET_FIELDS',
                data: recordTableRows(data)
            })
        }).
        catch((err) => {

        }).
        finally(() => { })
}


// addField
export const addField = (newField, callBack) => (dispatch) => {
    return axios.post('/addfield', newField).
        then((e) => {
            callBack(e);
        }).
        catch((err) => {
            callBack(err.response);
        }).
        finally(() => { })
}

// update field
export const updateField = (newField, callBack) => (dispatch) => {
    return axios.post('/updatefield', newField).
        then((e) => {
            callBack(e);
        }).
        catch((err) => {
            callBack(err.response);
        }).
        finally(() => { })
}

// remove field
export const removeField = (newField, callBack) => (dispatch) => {
    return axios.post('/removeField', newField).
        then((e) => {
            callBack(e);
        }).
        catch((err) => {
            callBack(err.response);
        }).
        finally(() => { })
}

// geting records
export const getRecords = (belongToWhichForm) => (dispatch) => {
    return axios.post('/getRecords', { belongToWhichForm }).
        then((res) => {
            dispatch({
                type: 'GET_RECORDS',
                data: converRecordesIntoRow(res.data)
            });
        }).
        catch((err) => {

        })
}

// save new record or update record
export const saveOrUpdateRecord = (record, responceCallBack) => (dispatch) => {
    return axios.post('/addOrUpdateRecord', record).then((e) => {
        console.log(e);
        responceCallBack(e);
    }).catch((err) => {

    })
}

// deleat record 
export const removeRecord = (record, responceCallBack) => (dispatch) => {
     return axios.post('/removeRecord' , record).then((res)=>{
        responceCallBack(res);
     }).catch((err)=>{

     })
    // console.log(record);
    
}

