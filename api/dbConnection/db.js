let mongoose = require("mongoose");

let connect = () =>{
    try{
	// add your local Mongodb or Mongodb Atlas()
        let db = mongoose.connect("");
        console.log('connected succesfully');
    }catch{
        console.log('error');
    }
}
module.exports = connect;
