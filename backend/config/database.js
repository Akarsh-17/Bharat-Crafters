const mongoose= require("mongoose");
require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DB_URL,{
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