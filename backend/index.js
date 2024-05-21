const express=require('express');
const dbConnect=require('./config/database');
const cloudinaryConnect=require('./config/cloudinary')
const cookieParser=require('cookie-parser')
const cors= require('cors')
const fileUpload= require('express-fileupload')
const helmet= require('helmet')
const morgan = require('morgan')
// const path = require('path')  // Node built-in path module
require('dotenv').config();
const bodyParser = require('body-parser');


const userRoutes=require('./routes/User')
const categoryRoutes=require('./routes/Category')
const productRoutes=require('./routes/Product')
const reviewRoutes=require('./routes/Review')
const conversationRoutes=require('./routes/Conversation')


const app=express();
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// const imagesPath = path.join(__dirname, 'images');
// app.use('/images', express.static(imagesPath));
const PORT= process.env.PORT||5000;


dbConnect();
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());
app.use(helmet())
app.use(morgan("common"))
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)


app.use((req, res, next) => {
	res.setHeader(
	  "Access-Control-Allow-Origin",
	  "http://localhost:3000","http://localhost:3001",
	);
	res.setHeader(
	  "Access-Control-Allow-Methods",
	  "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
	);
	res.setHeader(
	  "Access-Control-Allow-Headers",
	  "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Private-Network", true);
	res.setHeader("Access-Control-Max-Age", 259200);
  
	next();
  });

  app.use(
	cors({
	  origin: ["http://localhost:3000","http://localhost:3001"],
	  credentials: true,
	})
  );

// const corsOptions = {
// 	origin: 'http://localhost:3000',
// 	Access-Control-Allow-Credentials:true,
// 	credentials: true // Enable credentials
//   };

// const corsOptions = {
//     origin: 'http://localhost:3000',  // Ensure this matches your front-end URL exactly
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//     allowedHeaders: "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers",
//     credentials: true,
//     maxAge: 259200,  //3days
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));

  


app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);
app.use('/api/v1/review',reviewRoutes);
app.use('/api/v1/conversation',conversationRoutes);


app.listen(PORT,()=>{
    console.log(`app is running at port ${PORT}`);
});

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

