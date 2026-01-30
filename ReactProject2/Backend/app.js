
//V13jj6bJgwsYNU5T

const express = require('express');
const mongoose = require('mongoose');
const router = require('./Route/UserRoutes');

const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());
app.use("/users",router);
app.use("/file",express.static("file"));
app.use("/files", express.static("files"));


mongoose.connect('mongodb+srv://Admin:V13jj6bJgwsYNU5T@cluster0.gzyuc.mongodb.net/')
.then(() => console.log('Connected to MongoDB'))
.then(() => {
    app.listen(1000);
})
.catch((err) => console.log(err));

//Register-----------------------------------
//call RegisterModel.js file
require("./Model/RegisterModel");
const User = mongoose.model("Register");

//register user details
app.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    try {
        await User.create({
            name,
            email,
            password
        })
        res.send({status:"ok"});
       }catch (err){
        res.send({status:"error"});
    }
        });

//Login-----------------------------------
app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.json({err:"User not found"});
        }
        if(user.password === password){
            return res.json({status:"ok"});
        }else{
            return res.json({err:"Incorrect Password"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({err:" server error"});
    }
})
//Pdf -----------------------------------
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./file");
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix+file.originalname);
    },
});

//Insert PdfModel.js file part
require("./Model/PdfModel");
const pdfSchema = mongoose.model("PdfDetails");

const upload = multer({storage})
app.post("/uploadFile", upload.single("file"), async (req,res) => {
    console.log(req.file);
    const title = req.body.title;
    const pdf = req.file.filename;
    try{
        await pdfSchema.create({title: title, pdf: pdf});
        console.log("Pdf Uploaded Successfully");
        res.send({status:200});
    }catch(err){
        console.error(err);
        res.status(500).send({status: "error"});
    }
});
//get pdfFile part
app.get("/getFile", async (req,res) => {
    try{
        const data = await pdfSchema.find({});
        res.send({status:200, data:data});
    }catch(err){
        console.log(err);
        res.status(500).send({status:"error"});
    }
});

/////////////////////
//Img part

require("./Model/ImgModel");
const ImgSchema = mongoose.model("ImgModel");

const multerimg = require("multer");

const storageimg = multer.diskStorage({
    destination: function (req, file,cb){
        cb(null,"./files")
    },
    filename:function (req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix +file.originalname);
    }
});
const uploadimg = multerimg({storage: storageimg});

app.post("/uploadeImg",uploadimg.single("image"),async(req,res) => {
    console.log(req.body);
    const imageName = req.file.filename;

    try {
        await ImgSchema.create({image:imageName });
        res.json({ status:"ok"});
    } catch (error) {
        res.json({status: "error" });
    }
    
});

//Display img
app.get("/getImg", async (req, res) => {
    try{
        ImgSchema.find({}).then((data) => {
            res.send({ status:"ok", data:data });
        });
    } catch (error) {
        res.json({ status: error });
    }
});