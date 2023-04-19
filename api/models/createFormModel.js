let mongoose = require('mongoose');

let createFormModel = mongoose.Schema({
    formName : {
        type : String,
        required : [true , 'please enter the form name'],
    }
},{timestamps : true}
);

module.exports = mongoose.model('CreateForm' , createFormModel);