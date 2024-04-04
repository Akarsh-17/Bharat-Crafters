const { fileURLToPath } = require('url');
const path = require('path') 
require('dotenv').config({ path: '../.env' });
const MONGO_URI= process.env.DB_URL;
const mongoose= require("mongoose");

const dbConnect=()=>{
    mongoose.connect(MONGO_URI,{
    //  useNewUrlParser:true,
    //  useUnifiedTopology:true
    }
    )
    .then(()=>console.log("db connected successfully"))
    .catch((error)=>{
        console.log('DB connection Failure');
        console.error(error);
        process.exit(-1);
    })
}

module.exports=dbConnect;