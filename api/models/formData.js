let mongoose = require('mongoose')

let FormDataModel = mongoose.Schema(
    {
        belongToWhichForm : {
            type : mongoose.Schema.Types.ObjectId,
            require : [true , 'please select id'],
            ref : 'CreateForm'
        },
        record : {
            type : Array,
            require : [true , 'enetr the data']
        }
    },
    {
        timestamps : true 
    }
);


module.exports = mongoose.model('formDataModel',FormDataModel);
