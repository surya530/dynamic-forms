import React, { useState, useEffect } from "react";
import { FormControl, Grid } from "@mui/material";
import { String, Number, Date, Textarea, List } from "./Fields";

const Fields = (props) => {

    // useEffect(() => {

    // }, [])

    return (
        <>
            <Grid container spacing={5}>
                {
                    props?.fields?.map((e, index) => {
                        const { dataType, fieldName, options } = e;

                        if (dataType === 'string') {
                            return (
                                <Grid item xs={4} key={index}>
                                    <String placeholder={fieldName} />
                                </Grid>
                            )
                        }

                        if (dataType === 'number') {
                            return (
                                <Grid item xs={4} key={index}>
                                    <Number placeholder={fieldName} />
                                </Grid>
                            )
                        }

                        if (dataType === 'date') {
                            return (
                                <Grid item xs={4} key={index}>
                                    <Date placeholder={fieldName} />
                                </Grid>
                            )
                        }
                        if (dataType === 'textarea') {
                            return (
                                <Grid item xs={4} key={index}>
                                    <Textarea placeholder={fieldName} />
                                </Grid>
                            )
                        }
                        if (dataType === 'select') {
                            return (
                                <Grid item xs={4} key={index}>
                                    <List
                                        placeholder={fieldName}
                                        options={options}
                                    />
                                </Grid>
                            )
                        }

                        return (
                            <p>new new new</p>
                        )

                    })
                }

                {/* <Grid item xs={5}>
                        <Number placeholder={"surya"} />
                    </Grid>

                    <Grid item xs={3}>
                        <Number placeholder={"surya"} />
                    </Grid>

                    <Grid item xs={3}>
                        <Number placeholder={"surya"} />
                    </Grid> */}

            </Grid>
        </>
    )
}

export default Fields;
