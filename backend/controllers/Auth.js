const Buyer=require('../models/Buyer');
const Seller=require('../models/Seller');
const Admin=require('../models/Admin');
const OTP=require('../models/OTP');
const SellerProfile=require('../models/SellerProfile')
const BuyerProfile=require('../models/BuyerProfile')
const otpGenerator=require('otp-generator')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Cart=require("../models/Cart");
exports.sendOTP= async(req,res)=>{
    try{
        const {email}=req.body;
        const  existingSeller = await Seller.findOne({email});
        const  existingBuyer = await Buyer.findOne({email});
        const existingAdmin = await Admin.findOne({email});
        if(existingBuyer || existingSeller || existingAdmin)
        {
           return res.status(400).json({
               success:false,
               message: "User Already exists"
           })
        }

        var otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:true,
            specialChars:false
        })
        
        let result=await OTP.findOne({otp});

        while(result){
            otp= otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:ture,
                specialChars:false
            })
        }
        

        const otpPayload={email,otp};
        const otpBody=OTP.create(otpPayload);

        res.status(200).json({
            success:true,
            otp,
            message:"otp generated successfully"
            
        })
    }
    catch(error)
    {
        console.log("error in sendOTP controller",error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//VERIFY OTP

exports.verifyOTP= async(req,res)=>{

        const enteredOTP= req.body.enteredOTP;
        const otpfield= await OTP.findOne({email:req.body.email});
        if(!otpfield)
        {
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }
        const otp= otpfield.otp;
        console.log(otp,enteredOTP);

        if (enteredOTP === otp) {
            // OTP is valid
            
            return res.json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
}

/*
......
  BUYER SIGNUP .......
.....
*/
exports.signupBuyer=async (req,res)=>{
    try{
        
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            phoneNumber,
            phoneCode
        }=req.body

        // The HTTP status code '403 forbidden—you don't have permission to access this resource' 

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !phoneCode || !phoneNumber)
        {
            return res.status(403).json({
              success:false,
              message:'All fields are mandetory'
            })
        }

        // The 401 (Unauthorized) status code indicates that the request has not been 
        // applied because it lacks valid authentication credentials for the target resource.

        if(password!==confirmPassword)
        {
            return res.status(401).json({
                succes:false,
                message:'Confirm Password and Password does not not match'
            })
        }
        const existingBuyer=await Buyer.findOne({email})
        const existingSeller=await Seller.findOne({email})
        console.log("checked in db")

        if(existingBuyer)
        {
            return res.status(401).json({
                success:false,
                message:'User already exists as buyer'
            })
        }

        if(existingSeller)
        {
            return res.status(401).json({
                success:false,
                message:'User already exists as seller'
            })
        }

        const hashPass=await bcrypt.hash(password,10);
        const profileDetails=await BuyerProfile.create({
            gender:null,
            dateOfBirth:null,
            address:null,
            phoneNumber:phoneNumber,
            phoneCode:phoneCode
        })

        const user=await Buyer.create({
           firstName,
           lastName,
            email,
            password:hashPass,
            // accountType:'buyer',
            additionalDetail:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        })

        const newCart=new Cart();
        await newCart.save()
        user.cartSummary=0;
        user.cart=newCart._id
        await user.save();


        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '48h',
          });
    
          console.log('Generated token:', token);
          user.password = undefined;
    
          const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            domain: '.localhost',
            maxAge: 172800000, // 2 days
          };
    
          res.cookie("token", token, options).status(200).json({
            success: true,
            message: 'User is successfully registerd as BUYER',
            user,
          });
    }
    catch(error)
    {
      console.log(error)
      return res.status(500).json({
        success:false,
        message:'user can not be registered'
      })
    }
}


/*
.......
.....

    LOGIN FOR BUYER
.....
.......
*/


exports.loginBuyer = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please fill all details',
        });
      }
  
      const user = await Buyer.findOne({ email })
        .populate("additionalDetail")
        .populate("wishlist")
        .populate({
          path: "cart",
          populate: {
            path: "productList.productInfo",
          },
        })
        .lean()
        .exec();
  
      if (user?.cart?.productList && user.cart.productList.length > 0) {
        user.cart.productList.forEach((item) => {
          const selectedOptionId = item?.selectedOption;
          const productOptions = item?.productInfo?.options;
  
          const selectedOption = productOptions?.find(
            (option) => option?._id.toString() === selectedOptionId?.toString()
          );
  
          if (selectedOption) {
            item["selectedOptionObject"] = selectedOption;
            console.log("Selected Option:", selectedOption);
          } else {
            console.log("Option not found for item:", item);
          }
        });
      }
  
      console.log("User after processing:", user);
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }
  
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
  
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '48h',
        });
  
        console.log('Generated token:', token);
        user.password = undefined;
  
        const options = {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          domain: '.localhost',
          maxAge: 172800000, // 2 days
        };
  
        res.cookie("token", token, options).status(200).json({
          success: true,
          message: 'User logged in successfully',
          user,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Password incorrect",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Login failure',
      });
    }
  };
  


/*
.......
  SELLER SIGNUP .......
.....
*/

exports.signupSeller=async (req,res)=>{
    try{
        
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            phoneCode,
            phoneNumber,
            otp
        }=req.body

        // The HTTP status code '403 forbidden—you don't have permission to access this resource' 
        console.log(phoneCode);
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !phoneCode|| !phoneNumber)
        {
            return res.status(403).json({
                success:false,
                message:'All fields are mandetory'
            })
        }
        console.log(phoneCode);

        // The 401 (Unauthorized) status code indicates that the request has not been 
        // applied because it lacks valid authentication credentials for the target resource.

        if(password!==confirmPassword)
        {
            return res.status(401).json({
                success:false,
                message:'Confirm Password and Password does not not match'
            })
        }

        const existingBuyer=await Buyer.findOne({email})
        const existingSeller=await Seller.findOne({email})
        if(existingBuyer)
        {
            return res.status(401).json({
                success:false,
                message:'User already exists as buyer'
            })
        }

        if(existingSeller)
        {
            return res.status(401).json({
                success:false,
                message:'User already exists as seller'
            })
        }


        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log('printing recent otp ',recentOtp)
        // scope of error 
        if(recentOtp.length===0)
        {
            return res.status(400).json({
                success:false,
                message:'otp not found'
            })
        }
        else if(otp!==recentOtp[0].otp)
        {
            return res.status(400).json({
                success:false,
                message:'otp invalid'
            })
        }
        // console.log('before hash pass');
        const hashPass=await bcrypt.hash(password,10);
        // console.log('after hash pass');

        const profileDetails=await SellerProfile.create({
            gender:null,
            dateOfBirth:null,
            address:null,
        })

        // console.log('after profile ');

        const user=await Seller.create({
           firstName,
           lastName,
           email,
           phoneNumber,
           phoneCode,
           password:hashPass,
        //    accountType:'seller',
           additionalDetail:profileDetails._id,
           image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        })
        // console.log('after user ');

        return res.status(200).json({
            success:true,
            message:'User is sucessfully made a Seller',
            user
        }) 
    }
    catch(error)
    {
      console.log(error)
      return res.status(500).json({
        success:false,
        message:'user can not be registered'
      })
    }
}


/*
......
 CHANGE PASSWORD FOR BUYER
 ..........
*/

exports.buyerChangePassword=async(req,res)=>{
    try{

        const {oldPassword, newPassword, confirmPassword}=req.body;
        console.log(oldPassword, newPassword, confirmPassword)

        const buyerId= req.user.id;
        const user=await Buyer.findById(buyerId)

        if(!oldPassword || !newPassword || !confirmPassword)
        {
            return res.status(403).json({
                success:false,
                message:'All fields are mandetory'
              }) 
        }
        
        if(newPassword!==confirmPassword)
        {
            return res.status(401).json({
                succes:false,
                message:'Confirm Password and Password does not not match'
            })
        }

        if(bcrypt.compare(oldPassword,user.password))
        {
            const hashedPass = await bcrypt.hash(newPassword,10)
            const updateBuyer=await Buyer.findByIdAndUpdate(
                     req.Buyer.id,
                     {password:hashedPass},
                     {new:true}
            )
        }
        else{
            return res
				.status(401)
				.json({ success: false, message: "The existing password is incorrect" }); 
        }

        return res.status(200).json({
            message:"password updated successfully",
            success:true
        })
    }
    catch(error)
    {
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}


/*
.......
SELLER LOGIN.....
.......
*/


exports.loginSeller= async(req,res)=>{
    try{
        
        const {email,password}=req.body
        console.log("request received")
        console.log(email, password)


        if(!email || !password)
        {
            console.log("field empty")
            return res.status(403).json({
                success:false,
                message:'please fill all details'
            })
        }

        const user=await Seller.findOne({email}).populate("additionalDetail");
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:'Not registered as seller'
            })
        }

        const payload={
            email:user.email,
            accountType:user.accountType,
            id:user._id
        }
        if(await bcrypt.compare(password,user.password))
        {
            const token=jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn:'48h'
                }
            )

            // user.token=token
            user.password=undefined;

            // const options={
            //     httpOnly:true,
            //     expiresIN:new Date(Date.now()+3*24*60*60*1000),
            //     secure:true,
            //     sameSite:'None'
            // }


            // return res.cookie("token",token,options).status(200).json({
            //     success:true,
            //     message:'user logged in successfully',
            //     user,
            //     token
            // })

            const options = {
                httpOnly: false,  
                secure: true,  
                sameSite: 'None', 
                domain:'.localhost',
                //  maxAge: 60000 //1 min
                maxAge: 172800000 //2 days
            };
            
            return res.cookie("token", token, options).status(200).json({
                success: true,
                message: 'User logged in successfully',
                user,
                token
            });
            // res.send("Cookie has ben set!");
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password incorrect"
            })
        }

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'login failure'
        })
    }
}



/*
......
 CHANGE PASSWORD FOR Seller
 ..........
*/

exports.sellerChangePassword=async(req,res)=>{
    try{
        const {oldPassword, newPassword, confirmPassword}=req.body;
        const user=await Seller.findById(req.user.id);

        if(!oldPassword || !newPassword || !confirmPassword)
        {
            return res.status(403).json({
                success:false,
                message:'All fields are mandetory'
              }) 
        }
        
        if(newPassword!==confirmPassword)
        {
            return res.status(401).json({
                succes:false,
                message:'Confirm Password and Password does not not match'
            })
        }

        if(bcrypt.compare(oldPassword,user.password))
        {
            const hashedPass = await bcrypt.hash(newPassword,10)
            const updateSeller=await Seller.findByIdAndUpdate(
                     req.Seller.id,
                     {password:hashedPass},
                     {new:true}
            )
        }
        else{
            return res
				.status(401)
				.json({ success: false, message: "The existing password is incorrect" }); 
        }

        return res.status(200).json({
            message:"password updated successfully",
            success:true
        })
    }
    catch(error)
    {
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}



/*
......
  ADMIN SIGNUP .......
.....
*/


exports.signupAdmin=async (req,res)=>{
    try{
        
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp
        }=req.body

        // The HTTP status code '403 forbidden—you don't have permission to access this resource' 
        
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp)
        {
            return res.status(403).json({
              success:false,
              message:'All fields are mandetory'
            })
        }
    
        // The 401 (Unauthorized) status code indicates that the request has not been 
        // applied because it lacks valid authentication credentials for the target resource.

        if(password!==confirmPassword)
        {
            return res.status(401).json({
                succes:false,
                message:'Confirm Password and Password does not not match'
            })
        }

        const existingBuyer=await Buyer.findOne({email})
        const existingSeller=await Seller.findOne({email})
        const existingAdmin=await Admin.findOne({email})
        if(existingBuyer)
        {
            return res.status(401).json({
                success:false,
                message:'User already exists buyer'
            })
        }

        if(existingSeller)
        {
            return res.status(401).json({
                success:false,
                message:'User already exists as seller'
            })
        }

        if(existingAdmin)
        {
            return res.status(401).json({
                success:false,
                message:'User already exists as admin'
            })
        }


        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        
        // scope of error 
        if(recentOtp.length===0)
        {
            return res.status(400).json({
                success:false,
                message:'otp not found'
            })
        }
        else if(otp!==recentOtp[0].otp)
        {
            return res.status(400).json({
                success:false,
                message:'otp invalid'
            })
        }

        const hashPass=await bcrypt.hash(password,10);
        // const profileDetails=await BuyerProfile.create({
        //     gender:null,
        //     dateOfBirth:null,
        //     address:null,
        //     phoneNumber:null
        // })

        const user=await Admin.create({
            email,
            password:hashPass,
            accountType:'admin',
            // additionalDetail:profileDetails._id,
            // image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:'User is successfully registerd as Admin',
            user
        })
    }
    catch(error)
    {
      console.log(error)
      return res.status(500).json({
        success:false,
        message:'user can not be registered'
      })
    }
}


/*
.......
.....

    LOGIN FOR ADMIN
.....
.......
*/


exports.loginAdmin= async(req,res)=>{
    try{
        const {email,password}= req.body;

        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:'Please fill all details'
            })
        }

        let user=await Admin.findOne({email})

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:'user not found'
            })
        }


        const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType
        }

        if(await bcrypt.compare(password,user.password))
        {
            const token=jwt.sign(payload,
                process.env.JWT_SECRET,{
                    expiresIn:'48h'
                }
            )

            console.log('printing token',token)
            // review later
            user.token=token;
            user.password=undefined

            // plsease this article of more clearity
            // https://gemini.google.com/app/9ab264853e8d2f45
            const options={
                httpOnly:true,
                expiresIN:new Date(Date.now()+3*24*60*60*1000)
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                message:'User looged in successfully',
                token,
                user
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password incorrect"
            })
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'login failure'
        })
    }
}


   

exports.buyerWishList= async(req,res)=>{
    try{
        const buyerId=req.user.id
        console.log("body ",req.body.buyerWishlist)
        const user=await Buyer.findByIdAndUpdate(buyerId,
            {
                $set:{
                wishlist:req.body.buyerWishlist
                },
            },
            {
                new:true,
            }
        )
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:'user not found'
            })
        }
        console.log("user list ",user.wishlist)
        return res.status(200).json({
            success:true,
            user
        });
    }
    catch(error)
    {
        console.log(`Error getting wishlist: ${error}`);
        return res.status(500).json({
            success:false,
            error: error.message,
        });
    }
}

exports.buyerLogout=async(req,res)=>{
    try{
        const { cartProduct, cartSummary } = req.body;
        const buyerId=req.user.id;


        const user=await  Buyer.findByIdAndUpdate(buyerId,{
            $set:{cartSummary}
        })
        if (!user) {
            return res.status(404).json({ success: false, message: "Buyer not found" });
        }
        const cart= await Cart.findByIdAndUpdate(user?.cart,{
            $set:{productList:cartProduct},
        })
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }
        console.log("line 895",user)
        console.log("line 896",cart)

        return res
        .clearCookie("token", {
          sameSite: "none",
          secure: true,
        })
        .status(200).json({
            success: true,
            message:"logout successfull",
        })
        // .send("You logged out successfully.");
 
    }
    catch(error)
    {
        console.log(`Error while updating user during logout: ${error}`);
        return res.status(500).json({
            success: false,
            message: "Server error during logout",
            error: error.message, // Optional: You can decide whether to include this
        });
    }
}