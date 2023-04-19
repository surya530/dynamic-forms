let handler = require('express-async-handler');
let Fields = require("../models/fields");

let getAttrubets = handler(async(req,res)=>{
    
    let { id } = req.body;
    let belongToWhichForm = id;
    let fields = await Fields.find({ belongToWhichForm }).select({ updatedAt: 0 , createdAt : 0 , __v : 0 });
    if(fields.length <! 0){
        res.status(401)
        throw new Error('no fields for this form');
    }
    res.status(200).json(fields);
});

module.exports = {getAttrubets};
