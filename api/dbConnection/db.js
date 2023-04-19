let mongoose = require("mongoose");

let connect = () =>{
    try{
        let db = mongoose.connect("mongodb+srv://surya:sun30moon@cluster0.azehtmk.mongodb.net/?retryWrites=true&w=majority");
        console.log('connected succesfully');
    }catch{
        console.log('error');
    }
}
module.exports = connect;