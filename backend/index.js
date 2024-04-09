const express=require('express');
const dbConnect=require('./config/database');
const cloudinaryConnect=require('./config/cloudinary')
const cookieParser=require('cookie-parser')
const cors= require('cors')
const helmet= require('helmet')
const morgan = require('morgan')
const path = require('path')  // Node built-in path module
require('dotenv').config();


const userRoutes=require('./routes/User')


const app=express();
const imagesPath = path.join(__dirname, 'images');
app.use('/images', express.static(imagesPath));
const PORT= process.env.PORT||5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet())
app.use(morgan("common"))


app.use('/api/v1/auth',userRoutes);

app.listen(PORT,()=>{
    console.log(`app is running at port ${PORT}`);
});

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

dbConnect();
cloudinaryConnect();