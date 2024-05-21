const Message=require('../models/Messages')
require("dotenv").config();

exports.createNewMessage=async (req,res)=>{
    try{
        const messageData=req.body
        if (req.body.images) {
            const result = await uploadImageToCloudinary(req.body.images, {
                folder:process.env.FOLDER_NAME,
            });
            
            messageData.images = {
              public_id: result.public_id,
              url: result.url,
            };
        }

        messageData.conversationId = req.body.conversationId;
        messageData.sender = req.body.sender;
        messageData.text = req.body.text;

        const message = new Message({
          conversationId: messageData.conversationId,
          text: messageData.text,
          sender: messageData.sender,
          images: messageData.images ? messageData.images : undefined,
        });

        await message.save();

        res.status(200).json({
          success: true,
          message,
        });
    }
    catch(error)
    {
      console.log(`Can't create new message: ${err}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        message: "Failed to create new message",
      });  
    }
}

exports.getAllMessages=async(req,res)=>{
  try{
    const messages = await Message.find({
      conversationId: req.params.id,
    });

    res.status(200).json({
      success: true,
      messages,
    });
  }
  catch(error)
  {
    console.log(`Can't get all message: ${err}`);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to cget all message",
    })
  }
}