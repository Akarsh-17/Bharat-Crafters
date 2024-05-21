const Conversation=require('../models/Conversation')
const Buyer=require('../models/Buyer')
const Seller=require('../models/Seller')

// create new conversation
exports.createNewConversation=async (req,res)=>{
    try{
       const {groupTitle,sellerId}=req.body
       const buyerId=req.user.id

       const isConversationExist = await Conversation.findOne({ groupTitle })

       if(isConversationExist)
       {
          const conversation = isConversationExist;
          res.status(200).json({
            success: true,
            conversation,
          });
        }else {
          const conversation = await Conversation.create({
            members: [buyerId, sellerId],
            groupTitle: groupTitle,
          });
  
          res.status(200).json({
            success: true,
            conversation,
          });
        }
    }
    catch(error)
    {
        console.log(`Can't create new conversation: ${err}`);
        return res.status(500).json({
          success: false,
          error: error.message,
          message: "Failed to create new conversation",
        }); 
    }
}


exports.getSellerConversation=async(req,res)=>{
    try{
      const sellerId=req.user.id

      const conversation=await Conversation.find({
        members:{
            $in:[sellerId],
        }
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(200).json({
        success: true,
        conversation,
      });
    }
    catch(error)
    {
        console.log(`Can't get seller conversation: ${err}`);
        return res.status(500).json({
          success: false,
          error: error.message,
          message: "Failed to get seller conversation",
        }); 
    }
}

exports.getBuyerConversation=async(req,res)=>{
    try{
      const buyer=req.user.id

      const conversation=await Conversation.find({
        members:{
            $in:[buyer],
        }
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(200).json({
        success: true,
        conversation,
      });
    }
    catch(error)
    {
      console.log(`Can't get user conversation: ${err}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        message: "Failed to get user conversation",
      }); 
    }
}

exports.updatedLastMessage=async(req,res)=>{
  try{
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage,
      lastMessageId,
    });

    res.status(200).json({
      success: true,
      conversation,
    });
  }
  catch(error)
  {
    console.log(`Can't update last message: ${err}`);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to update last message:",
    }); 

  }
}

exports.getBuyerInfo=async(req,res)=>{
  try{
    const user=await Buyer.findById(req.params.id)

    res.status(200).json({
      success:true,
      user
    })
  }
  catch(error)
  {
    console.log(`Can't find user info : ${err}`);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to find user info:",
    });    
  }
}



exports.getSellerInfo=async(req,res)=>{
  try{
    const user=await Seller.findById(req.params.id)

    res.status(200).json({
      success:true,
      user
    })
  }
  catch(error)
  {
    console.log(`Can't find user info : ${err}`);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to find user info:",
    });    
  }
}