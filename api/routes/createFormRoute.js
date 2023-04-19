let express = require('express');

let router = express.Router();
let { createForm, editForm, getForms } = require("../contreals/createForm");
let { getFields, addField, updateField, removeField } = require("../contreals/fieldContrals");
let { getAttrubets } = require('../contreals/getAllAttrubets')
let { addOrUpdateRecordToForm, getRecords, removeRecord } = require('../contreals/addRecordToForm');

// add , update , remove forms
router.route('/createForm').post(createForm);
router.route('/editForm').post(editForm);
router.route('/getForms').get(getForms);

// add , deleat , update fields
router.route('/getFields').post(getFields);
router.route('/addfield').post(addField);
router.route('/updatefield').post(updateField);
router.route('/removeField').post(removeField);
router.route('/getAttrubetsForForm').post(getAttrubets);

//add , update , remove  records
router.route('/addOrUpdateRecord').post(addOrUpdateRecordToForm);
router.route('/getRecords').post(getRecords);
router.route('/removeRecord').post(removeRecord);

module.exports = router;