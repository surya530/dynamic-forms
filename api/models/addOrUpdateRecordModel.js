let mongoose = require('mongoose');

let addOrUpdateRecodeModel = mongoose.Schema({
    belongToWhichForm : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true , 'please enter the id of belong to whice form']
    },
    formName : {
        type : String,
        required : [true , 'please enter the form name'],
    },
    record: {
        type : Object,
        required : [true , 'please enter the single record in object']
    }
} , {timestamps : true});


module.exports = mongoose.model('addOrUpdateRecode' , addOrUpdateRecodeModel);
