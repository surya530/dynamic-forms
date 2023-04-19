import React, { useState, useEffect, useMemo } from "react";

// icons 
import { Icon } from '@iconify/react';
// table ag-grid
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const RecordsTable = (props) => {

    const { fields, records, editRecord, deleteRecord } = props;



    const ActionIcons = ({ row }) => {
        return (
            <>
                <Icon
                    fontSize={21}
                    color='darkblue'
                    icon="tabler:edit"
                    onClick={() => { editRecord(row) }}
                />
                &nbsp;&nbsp;&nbsp;
                <Icon
                    fontSize={21}
                    color='red'
                    // icon="tabler:circle-letter-x"
                    icon="ic:baseline-delete"
                    onClick={() => { deleteRecord(row) }}
                />
            </>
        )
    }

    return (
        <div className="ag-theme-alpine" style={{ width: 500, height: 300, marginTop: '2%' }}>
            <AgGridReact
                columnDefs={[...fields,
                { field: '_id', filter: true, hide: true },
                {
                    field: 'action', width: '90', pinned: 'right',
                    cellRenderer: (row) => (<ActionIcons row={row} />)
                }
                ]}
                rowData={records}
            />
        </div>
    )
}

export default RecordsTable;