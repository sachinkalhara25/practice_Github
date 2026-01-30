const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImgSchema = new Schema({
    image:{
        type:String,//dataType
        required:true,//validation
    },
    
   
    
    
    });

module.exports = mongoose.model("ImgModel",//file name
                                 ImgSchema//schema name
                                 )