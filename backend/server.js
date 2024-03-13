const express = require("express")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const cors = require("cors");
const loginModel = require("./models/loginModel");
const jwt = require("jsonwebtoken");
const checkUser = require("./middleware");
const projects = require("./jsondata")

const server = express();
require("dotenv").config();

const PORT = process.env.PORT;
server.use(express.json())
server.use(cors())

mongoose.connect("mongodb+srv://pbabu11088:pbabu11088@cluster0.crts8yn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to atlas")
})
.catch((err)=>{
    console.log("Error while connecting to atlas")
})

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'hyrr', {
    expiresIn: maxAge
  });
};

server.get("*",checkUser)

server.get('/api/products', (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    
    const paginatedProducts = projects.slice(startIndex, endIndex);

    
    
    const totalPages = Math.ceil(projects.length / pageSize);
    
    res.json({ products: paginatedProducts, totalPages });
  });



server.post("/Signup",(req,res)=>{
    const {firstName,lastName,email,password}=req.body
    console.log({firstName,lastName,email,password})
    try{
        const details = loginModel.create({firstName,lastName,email,password})
        const token = createToken(details)
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge * 1000})
        res.status(200).json({details})  
    }catch(err){
        res.status(303).json({err:"detils can't post to db"})
    }
    
    // console.log(req.body);  
})


server.listen(PORT,()=>{
    console.log(`server is listening at PORT ${PORT}`)
})