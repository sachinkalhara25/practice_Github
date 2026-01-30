const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,//dataType
        required:true,//validation
    },
    email:{
        type:String,//dataType
        required:true,//validation
        unique:true,//validation
    },
    age:{
        type:Number,//dataType
        required:true,//validation
    },
    address:{
        type:String,//dataType
        required:true,//validation
    }
    
    });

module.exports = mongoose.model('UserModel',//file name
                                 userSchema//schema name
                                 )