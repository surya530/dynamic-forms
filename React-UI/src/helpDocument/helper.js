export function recordTableRows(tableHeaders) {
    const colums = tableHeaders.map((e) => ({ _id: e._id ? e._id : '', field: e.fieldName, filter: true, dataType: e.dataType, fieldName: e.fieldName, formName: e.formName, options: e.info }));
    return colums.length > 0 ? colums : [];

}

export function converRecordesIntoRow(records) {
    const mainRecordes = records.map((e) => ({ ...e.record, "_id": e._id }));
    return mainRecordes.length > 0 ? mainRecordes : [];
}

