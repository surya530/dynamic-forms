import React, { useState, useEffect, useContext } from "react";
import { TextField, Container, Typography } from "@mui/material";
import moment from "moment";

import DatePicker from 'react-date-picker';
// styles for react date picker
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

// react select
import Select from 'react-select';

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import MainContext from '../context';

// string => datetype
export const String = (props) => {

    const values = useContext(MainContext);
    const { changeValue } = values;

    const change = (event) => {
        changeValue(event.target.value, event.target.placeholder);
    }

    return (
        <>
            <TextField
                label={props.placeholder}
                type='text'
                placeholder={props.placeholder}
                value={values.initialValues[props.placeholder]}
                size='small'
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={change}
            />
        </>
    )
}

// number => datatype
export const Number = (props) => {

    const values = useContext(MainContext);
    const { changeValue } = values;

    const change = (event) => {
        changeValue(event.target.value, event.target.placeholder);
    }

    return (
        <>
            <TextField
                label={props.placeholder}
                type='number'
                size='small'
                placeholder={props.placeholder}
                value={values.initialValues[props.placeholder]}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={change}
            />
        </>
    )
}

// textarea => datatype
export const Textarea = (props) => {

    const values = useContext(MainContext);
    const { changeValue } = values;

    const change = (event) => {
        changeValue(event.target.value, event.target.placeholder);
    }

    return (
        <>
            <TextField
                label={props.placeholder}
                type='text'
                multiline
                rows={4}
                placeholder={props.placeholder}
                value={values.initialValues[props.placeholder]}
                onChange={change}
            />
        </>
    )
}


// date => datatype
export const Date = (props) => {

    let date; let month; let year;

    const values = useContext(MainContext);
    const { changeValue } = values;

    const changeDateToObject = (date) => {
        let s;
        s = moment(date, 'MM-DD-YYYY', true);
        s = s.isValid() ? s.toDate() : '';
        return s;
    }

    const change = (event) => {
        if (event !== null && event !== undefined) {
            date = event.getDate() > 9 ? event.getDate() : `0${event.getDate()}`;
            month = event.getMonth() > 9 ? event.getMonth() + 1 : `0${event.getMonth() + 1}`;
            year = event.getFullYear();
            changeValue(`${month}-${date}-${year}`, props.placeholder);
        } else {
            changeValue('', props.placeholder);
        }

    }

    return (
        <Container>
            <Typography variant='subtitle2'>{props.placeholder}</Typography>
            <DatePicker
                placeholderText={props.placeholder}
                value={changeDateToObject(values.initialValues[props.placeholder])}
                onChange={change}
            />
        </Container>
    )
}

export const List = (props) => {

    const values = useContext(MainContext);
    const { changeValue } = values;

    const setOptions = (val) => {
        changeValue(val.option, props.placeholder)
    }

    const setOptionToDropDown = (value) => {
        const { options } = props;
        const opt = options?.filter((e) => { return e.option === value });
        return opt;
    }

    return (
        <Container>
            <Select
                value={setOptionToDropDown(values.initialValues[props.placeholder])}
                options={props.options.length > 0 ? props.options : []}
                getOptionLabel={o => o.option}
                getOptionValue={o => o.index}
                placeholder={props.placeholder}
                onChange={setOptions}
            />
        </Container>
    )
}


