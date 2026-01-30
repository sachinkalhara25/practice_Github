const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
    pdf:{
        type:String,//dataType
        required:true,//validation
    },
    title:{
        type:String,//dataType
        required:true,//validation
        
    },
   
    
    
    });

module.exports = mongoose.model("PdfDetails",//file name
                                 pdfSchema//schema name
                                 )