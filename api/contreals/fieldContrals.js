let handler = require('express-async-handler');
let Field = require("../models/fields");
let AddOrUpdateRecordModel = require('../models/addOrUpdateRecordModel');

// get Fields
let getFields = handler(async (req, res) => {
   let { _id } = req.body;
   let fields = await Field.find({ belongToWhichForm: _id });
   res.status(200).json(fields);
})

// add Field
let addField = handler(async (req, res) => {
   let { belongToWhichForm, formName, fieldName, dataType, info } = req.body;
   let checkField = await Field.find({ formName, fieldName });
   if (checkField.length > 0) {
      res.status(401)
      throw new Error('Field alread exist.')
   }
   //   let newField = await Field.create({ belongToWhichForm, formName, fieldName, dataType });
   if (dataType == 'select') {
      newField = await Field.create({ belongToWhichForm, formName, fieldName, dataType, info });
   } else {
      newField = await Field.create({ belongToWhichForm, formName, fieldName, dataType });
   }
   res.status(200).json({ data: newField._id ? "Field created." : "" });
});

// update Field
let updateField = handler(async (req, res) => {

   let { _id, belongToWhichForm } = req.body;
   let records = await AddOrUpdateRecordModel.find({ belongToWhichForm: belongToWhichForm });

   if (records.length > 0) {
      res.status(401)
      throw new Error('Records exist for the form');
   }
   // let checkField = await Field.find({ _id , belongToWhichForm , formName , fieldName  });
   // if(checkField.length > 0){
   //    res.status(200)
   //    throw new Error('field alread exist')
   // }

   let data = await Field.findByIdAndUpdate(_id, { ...req.body }, { new: true });
   res.status(200).json({ data: data._id ? "Field update." : "" });

});

// remove Field
let removeField = handler(async (req, res) => {

   let { _id, belongToWhichForm } = req.body;
   let records = await AddOrUpdateRecordModel.find({ belongToWhichForm: belongToWhichForm });

   if (records.length > 0) {
      res.status(401)
      throw new Error('records exist for the form');
   }

   let field = await Field.findByIdAndRemove({ _id });
   res.status(200).json({ "data": field._id ? "Field removed." : "Field does not exist." });

});

module.exports = { getFields, addField, updateField, removeField };


