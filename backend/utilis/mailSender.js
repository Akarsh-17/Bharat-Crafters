const nodemailer=require('nodemailer');
require('dotenv').config();

const mailSender= async(email,title,body)=>{
  try{
    let transporter=nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
          }
        })
        // console.log("before sending mail")
        let info= transporter.sendMail({
            from:'Bharat Crafters',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`   
        })
        // console.log("after sending mail")
        console.log(info);
        return info
        
    }
  catch(error) 
  {
    console.log('printin error of mail ',error.message);
    // console.log(error)
  }
 
}

module.exports=mailSender;
