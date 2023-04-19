let handler = require('express-async-handler');
let CreateForm = require('../models/createFormModel');

let createForm = handler(async (req,res)=>{
      let { formName } = req.body;
      let form = await CreateForm.find({ formName });
      if(form.length > 0){
            res.status(403)
            throw new Error('form all ready exist');
      }
      
      let newForm = await CreateForm.create({formName});
      res.status(200).json(newForm);      
} 
)

let editForm = handler(async (req,res)=>{
   
      let { id ,  formName } = req.body;
      let form = await CreateForm.findByIdAndUpdate( id , { "formName" : formName  } , {new : true });
      if(!form){
            res.status(400)
            throw new Error("form id does not exist");
      }
      res.status(201).json(form);
   }
 
  );

  let getForms = handler(async (req,res)=>{
      let forms = await CreateForm.find({});
      if(forms == null){
          res.status(402)
          throw new Error('forms does not exist');
      }
      res.status(200).json(forms);
  });
  



module.exports = { createForm , editForm , getForms };
