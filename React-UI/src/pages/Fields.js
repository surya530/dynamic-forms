import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Modal, TextField, MenuItem } from '@mui/material';
import { Icon } from '@iconify/react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { useSnackbar } from 'notistack';
// table ag-grid
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

// serives calls
import { getForms, getFields, addField, updateField, removeField } from "../actions/formActions";
import './styles.css';

const Fields = (props) => {

    const { enqueueSnackbar } = useSnackbar();

    const [formName, setFormName] = useState(null);
    const [showTable, setShowTable] = useState(false);

    const [storeForm, setStoreForm] = useState([]);

    const [isClearable] = useState(true);
    const [showModel, setSHowModel] = useState(false);


    const [fieldInfo, setFieldInfo] = useState('');
    // const [fieldName, setFieldName] = useState('');


    useEffect(() => {
        props.dispatch(getForms());
    }, []);

    const getFieldsformSerives = async (formName) => {
        setFormName(formName !== null ? formName : null);
        await props.dispatch(getFields(formName && formName._id));
        if (formName == null) {
            setShowTable(false);
        } else {
            setShowTable(true);
        }
    }

    const addNewField = async (obj) => {
        // console.log(obj);
        if (obj.newField !== '' && obj.newDataType !== '') {
            obj.fieldName ||= obj.newField;
            obj.dataType ||= obj.newDataType;
            obj.formName ||= formName.formName;
            obj.belongToWhichForm ||= formName._id;
            if (obj.newDataType === 'select') {
                let testOption = 0;
                for (let i = 0; i < obj.options.length; i += 1) {
                    obj.options[i].index = i;
                    if (obj?.options[i]?.option === '') {
                        testOption = i;
                    }
                }
                if (testOption > 0) {
                    const variant = 'error';
                    enqueueSnackbar(`${testOption + 1} options value are empty.`, { variant });
                    return;
                }
                obj.info ||= obj.options;
            }
            if (obj && obj._id) {
                const _id = obj._id;
                obj._id = _id;
                delete obj.options;
                await props.dispatch(updateField(obj, resCallBack));
                await props.dispatch(getFields(formName && formName._id));
            }
            else {
                delete obj._id;
                delete obj.options;
                await props.dispatch(addField(obj, resCallBack));
                await props.dispatch(getFields(formName && formName._id));
            }
            closeModel();
        } else {
            //   alert(1);
        }
    }

    const editField = (fildInfo) => {
        setFieldInfo(fildInfo.data);
        setSHowModel(!showModel);
    }

    const removeFiels = async (obj) => {
        const { data } = obj;
        const newObj = {};
        newObj._id = data._id;
        newObj.belongToWhichForm = formName._id;
        await props.dispatch(removeField(newObj, resCallBack));
        await props.dispatch(getFields(formName && formName._id));
    }

    const closeModel = () => { setSHowModel(!showModel) }

    const resCallBack = (responce) => {
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
                    <Typography variant='h3' gutterBottom>Fields</Typography>
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
                    formName !== null && showTable === true ?
                        <div>
                            <div className='AddFieldButtonInFieldScreen'>
                                <Button startIcon={<Icon icon="material-symbols:add" />} variant='contained' size='small' color='secondary' onClick={() => { setFieldInfo(''); setSHowModel(!showModel) }}>
                                    Add Field
                                </Button>
                                {
                                    showModel === true ?
                                        <BasicModal
                                            open={showModel}
                                            close={closeModel}
                                            addNewField={addNewField}
                                            fieldInfo={fieldInfo}
                                        /> : ''
                                }
                            </div>
                            {
                                props.fields.length > 0 ?
                                    <ShowFieldsInTable
                                        data={props.fields}
                                        editField={editField}
                                        removeFiels={removeFiels}
                                    /> : <Typography variant='h5' style={{ textAlign: 'center', color: 'red' }}>No Fields</Typography>
                            }
                        </div>
                        : <></>

                }
            </Box>

        </>
    )
}

const ShowFieldsInTable = (props) => {


    const [col, setCol] = useState([
        { field: '_id', hide: true },
        { field: 'fieldName', filter: true, editable: true },
        { field: 'dataType' ,  headerName : 'Type' , filter: true, editable: true },
        { field: 'formName', filter: true, editable: true },
        {
            field: 'action', pinned: 'right', width: '90',
            cellRenderer: (row) => (<ActionIcons row={row} />)
        }
    ]);

    const ActionIcons = ({ row }) => {
        return (
            <>
                <Icon
                    fontSize={21}
                    color='darkblue'
                    icon="tabler:edit"
                    onClick={() => { props.editField(row) }}
                />
                &nbsp;&nbsp;&nbsp;
                <Icon
                    fontSize={21}
                    color='red'
                    icon="tabler:circle-letter-x"
                    onClick={() => { props.removeFiels(row) }}
                />
            </>
        )
    }

    return (
        <>
            <div className="ag-theme-alpine" style={{ width: 600, height: 250, marginTop: '2%' }}>
                <AgGridReact
                    columnDefs={col}
                    rowData={props.data.length > 0 ? props.data : []}
                    editType={'fullRow'}
                    onRowValueChanged={(event) => { console.log(event) }}
                />
            </div>
        </>
    )
}

// old model
// function BasicModal(props) {

//     const { fieldInfo } = props;
//     const { _id } = fieldInfo;

//     const [newField, setNewField] = useState((props && props.fieldInfo && props.fieldInfo.field) || null);
//     const [newDataType, setNewDateType] = useState((props && props.fieldInfo && props.fieldInfo.dataType) || null);

//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//     };

//     const dataTypes = [
//         { value: 'string', label: 'String' },
//         { value: 'number', label: 'Number' },
//         { value: 'date', label: 'Date' },
//         { value: 'textarea', label: 'Textarea' },
//     ];

//     return (
//         <div>
//             <Modal
//                 open={props.open}
//                 onClose={props.close}
//             >
//                 <Box sx={style}>
//                     <Typography id="modal-modal-title" variant="h4" component="h2">Create New Field</Typography>
//                     <TextField
//                         value={newField}
//                         label="Field Name"
//                         variant='filled'
//                         sx={{ width: 320, marginTop: 2 }} size='small'
//                         onChange={(event) => { setNewField(event.target.value) }} />
//                     <TextField select
//                         value={newDataType}
//                         label='Select dataType'
//                         sx={{ width: 320, marginTop: 2 }} size='small'
//                         onChange={(event) => { setNewDateType(event.target.value) }} >
//                         {
//                             dataTypes?.map((e, index) => { return (<MenuItem key={index} value={e.value}>{e.label}</MenuItem>) })
//                         }
//                     </TextField>
//                     <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
//                         <Button variant='contained' size='small' color='secondary' onClick={() => { props.addNewField({ newField, newDataType, _id }) }}>submit</Button>
//                         <Button variant='contained' size='small' color='secondary' onClick={() => { props.close() }}>close</Button>
//                     </div>
//                 </Box>
//             </Modal>
//         </div>
//     )
// }

function BasicModal(props) {
    const { fieldInfo } = props;
    const { _id } = fieldInfo;

    const [newField, setNewField] = useState((props && props.fieldInfo && props.fieldInfo.field) || null);
    const [newDataType, setNewDateType] = useState((props && props.fieldInfo && props.fieldInfo.dataType) || null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    // select options code
    const [options, setOptions] = useState(props?.fieldInfo?.options?.length > 0 ? props?.fieldInfo?.options : [{ option: '' }]);

    const removeOptions = (index) => {
        const ops = [...options];
        ops.splice(index, 1);
        setOptions(ops);
    }

    const showOptions = () => {
        // console.log(options)
    }


    const dataTypes = [
        {
            value: 'string',
            label: 'String',
        },
        {
            value: 'number',
            label: 'Number',
        },
        {
            value: 'date',
            label: 'Date',
        },
        {
            value: 'textarea',
            label: 'Textarea',
        },
        {
            value: 'select',
            label: 'Select'
        }
    ];

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.close}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">Create New Field</Typography>
                    <TextField
                        value={newField}
                        label="Field Name" variant='filled' sx={{ width: 320, marginTop: 2 }} size='small'
                        onChange={(event) => { setNewField(event.target.value) }} />
                    <TextField select
                        value={newDataType}
                        label='Select dataType' sx={{ width: 320, marginTop: 2 }} size='small'
                        onChange={(event) => { setNewDateType(event.target.value) }} >
                        {
                            dataTypes?.map((e, index) => { return (<MenuItem key={index} value={e.value}>{e.label}</MenuItem>) })
                        }
                    </TextField>
                    {
                        newDataType === 'select' &&
                        <div style={{ marginLeft: '10px' }}>
                            <Typography variant='h6'>options</Typography>
                            <div style={{ overflow: 'scroll', height: '120px' }} >
                                {
                                    options && options?.map((e, index) => {
                                        return (
                                            <div key={index}>
                                                <TextField
                                                    name='option'
                                                    value={e.option}
                                                    placeholder='option name'
                                                    sx={{ marginBottom: '2px' }}
                                                    size='small'
                                                    onChange={(event) => {
                                                        const ops = [...options];
                                                        ops[index][event.target.name] = event.target.value;
                                                        setOptions(ops);
                                                    }}
                                                />
                                                <Button size='small'
                                                    color='error'
                                                    variant='text'
                                                    onClick={() => {
                                                        removeOptions(index);
                                                    }}
                                                >remove</Button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <Button onClick={() => { setOptions([...options, { option: '' }]) }} >Add</Button>
                            <Button onClick={() => { setOptions([]) }}>clear</Button>
                            {/* <Button onClick={() => { showOptions() }}>show options</Button> */}
                        </div>
                    }
                    <div style={{ display: 'flex', marginTop: '15px', marginLeft : '85px' }}>
                        <Button variant='contained' size='small' color='secondary' onClick={() => { props.addNewField({ newField, newDataType, _id, options }) }}>submit</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant='contained' size='small' color='secondary' onClick={() => { props.close() }}>close</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}



const stateToProps = (state) => ({
    forms: state.storeForms.allForms,
    fields: state.storeFields.allFields
});

export default connect(stateToProps, (dispatch) => ({ dispatch }))(Fields);
