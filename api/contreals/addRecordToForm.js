let handler = require('express-async-handler');
let addOrUpdateRecord = require("../models/addOrUpdateRecordModel");

let getRecords = handler(async (req, res) => {
    let { belongToWhichForm } = req.body;
    let data = await addOrUpdateRecord.where('belongToWhichForm').equals(belongToWhichForm).
        select({ record: 1 });
    res.status(200).json(data);
});

let addOrUpdateRecordToForm = handler(async (req, res) => {
    let { belongToWhichForm, formName, record, _id } = req.body;
    if (_id == null || _id == undefined) {
        let newRecord = await addOrUpdateRecord.create({ belongToWhichForm, formName, record });
        res.status(200).json({ "data": "new record added" });
    } else {
        let { _id } = req.body;
        let newRecord = await addOrUpdateRecord.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json({ 'data': 'record update succfully' });
    }
});

let removeRecord = handler(async (req, res) => {
    let { _id } = req.body;
    let record = await addOrUpdateRecord.findByIdAndRemove(_id , {new : true});
    res.status(200).json({data : record._id ? 'record delete' : "" });
});

module.exports = { addOrUpdateRecordToForm, getRecords, removeRecord };