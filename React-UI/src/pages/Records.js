import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Typography, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import Select from "react-select";

// serives call
import { getForms, getFields, getRecords, saveOrUpdateRecord , removeRecord } from "../actions/formActions";

// context
import { FormContext } from "./context";

// table
import RecordsTable from "./RecordsTable";
// fields
import Fields from "./fields";

// styles
import './styles.css'

const Records = (props) => {

    const { enqueueSnackbar } = useSnackbar();

    const [formName, setFormName] = useState(null);
    const [isClearable] = useState(true);

    const [showForms, setShowForms] = useState(false);

    const [buttonName, setButtonName] = useState('add');

    const [editOrDeleatRecord, setEditOrDeleatRecord] = useState("");// set add or edit 
    const [editRec, setEditRec] = useState({}) // if click edit record then stopre that record in state

    useEffect(() => {
        props.dispatch(getForms());
    }, []);

    const getFieldsformSerives = (formName) => {
        setFormName(formName !== null ? formName : null);
        props.dispatch(getFields(formName && formName._id));
        props.dispatch(getRecords(formName && formName._id));
        setShowForms(false);
        setButtonName('Add');
    }

    const showFormsFun = () => {
        setButtonName(showForms === false ? 'close' : 'Add');
        setEditOrDeleatRecord('add');
        setShowForms(!showForms);
    }

    const newRecord = (obj) => {
        const newObj = obj.map((e) => { return e?.fieldName });
        const newObj2 = {};
        for (let i = 0; i < newObj.length; i += 1) {
            newObj2[newObj[i]] = ''
        }
        return newObj2;
    }

    const deleteRecord = async (record) => {
        await props.dispatch(removeRecord(record.data , ResponseCallBack));
        await props.dispatch(getRecords(formName && formName._id));
    }

    const editRecord = (record) => {
        setShowForms(true);
        setButtonName('close');
        setEditOrDeleatRecord('edit');
        setEditRec(record.data);
    }

    const submitData = async (data) => {
        const recordData = {
            "_id": data._id ? data._id : null,
            "belongToWhichForm": formName && formName._id,
            "formName": formName && formName.formName,
            "record": data
        }
        // serives call
        await props.dispatch(saveOrUpdateRecord(recordData, ResponseCallBack));
        await props.dispatch(getRecords(formName && formName._id));
        setShowForms(false);
        setButtonName('Add');
    }

    // const ResponseCallBack = (s) => {
    //     switch (s) {
    //         default:
    //             handleClick(s);
    //             return 0;
    //     }
    // }

    // const handleClick = (s) => {
    //     if (s.status > 199 && s.status < 300) {
    //         const variant = 'success';
    //         enqueueSnackbar(s.data.data, { variant });
    //     } else {
    //         // variant could be success, error, warning, info, or default
    //         const variant = 'error';
    //         enqueueSnackbar(s.data.data, { variant });
    //     }
    // };

    const ResponseCallBack = (responce) => {
        if (responce.status >= 200 && responce.status <= 300) {
            const variant = 'success';
            enqueueSnackbar(responce.data.data, { variant });
        } else {
            // data.message
            // variant could be success, error, warning, info, or default
            const variant = 'error';
            enqueueSnackbar(responce.data.message, { variant });
        }
    }


    return (
        <>
            <Box sx={{ width: '100%', maxWidth: 900 }}>
                <div>
                    <Typography variant='h3' gutterBottom>Records</Typography>
                </div>
                <div>
                    <Select
                        className='selectBox'
                        value={formName}
                        isClearable={isClearable}
                        options={props.forms}
                        getOptionLabel={option => option.formName}
                        getOptionValue={option => option._id}
                        onChange={getFieldsformSerives}
                    />
                </div>
                {
                    !!formName && props.fields.length > 0 &&
                    <Button sx={{ marginLeft: 110 }} variant='contained' size='small' onClick={showFormsFun}>{buttonName}</Button>
                }
                {
                    !!showForms && props.fields.length > 0 &&
                    <>
                        <FormContext
                            initialValues={
                                editOrDeleatRecord === 'add' ?
                                    newRecord(props.fields)
                                    :
                                    editRec
                            } submitData={submitData}>
                            <Fields fields={props.fields} />
                        </FormContext>
                    </>
                }
                {
                    !!formName && props.fields.length > 0 &&
                    <RecordsTable
                        fields={props.fields}
                        records={props.records}
                        editRecord={editRecord}
                        deleteRecord={deleteRecord}
                    />
                }
            </Box>
        </>
    )
}

const stateToPrps = (state) => ({
    forms: state.storeForms.allForms,
    fields: state.storeFields.allFields,
    records: state.storeRecords.allRecords

});

export default connect(stateToPrps, (dispatch) => ({ dispatch }))(Records);