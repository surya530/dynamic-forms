let mongoose = require('mongoose');

let FieldsModel = mongoose.Schema({
    belongToWhichForm: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "please eneter form Id"],
        ref: 'CreateForm'
    },
    formName: {
        type: String,
        required: [true, 'please enter the form name'],
        ref: 'CreateForm'
    },
    fieldName: {
        type: String,
        require: [true, 'please enter the field name'],
    },
    dataType: {
        type: String,
        req: [true, 'please enter the dataType']
    },
    info: {
        type: Array,
        require: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Fields', FieldsModel);