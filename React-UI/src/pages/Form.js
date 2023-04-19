import React, { useState, useEffect } from "react";
import { Box, TextField, Button , Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { connect } from "react-redux";

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import { getForms, createForm } from "../actions/formActions";

const Form = (props) => {

    const { enqueueSnackbar } = useSnackbar();

    const [formsNames, setForms] = useState();
    const [newForm, setNewForm] = useState(null);

    const [col, setCol] = useState([
        { field: 'formName', filter: true },
    ])

    useEffect(() => {
        mainCall();
    }, []);

    const mainCall = () => {
        props.dispatch(getForms());
        setForms(props.forms.allForms);
    }

    const createNewForm = async () => {
        await props.dispatch(createForm(newForm, ResponseCallBack));
        await props.dispatch(getForms());
    }

    const ResponseCallBack = (s) => {
        switch (s) {
            default:
                handleClick(s);
                return 0;
        }
    }

    const handleClick = (s) => {
        if (s > 199 && s < 300) {
            const variant = 'success';
            enqueueSnackbar('form created successfully', { variant });
        } else {
            // variant could be success, error, warning, info, or default
            const variant = 'error';
            enqueueSnackbar('form name is allready exist', { variant });
        }
    };

    return (
        <div>
            <Box
                component='form'
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <Typography variant='h3' gutterBottom>Forms</Typography>
                </div>
                <div>
                    <TextField
                        placeholder='enter form name'
                        onChange={(event) => { setNewForm(event.target.value) }}
                    />
                </div>
                <div>
                    <Button style={{ marginLeft: '15%' }}
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={createNewForm}
                    >submit</Button>
                </div>
            </Box>
            <div className="ag-theme-alpine" style={{ width: 500, height: 300, marginTop: '2%' }}>
                <AgGridReact
                    columnDefs={col}
                    rowData={props.forms.allForms}
                />
            </div>

        </div>
    )
}

const mapToProps = (state) => ({
    forms: state.storeForms
});

export default connect(mapToProps, (dispatch) => ({ dispatch }))(Form);
