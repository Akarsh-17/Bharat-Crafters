const BuyerProfile=require('../models/BuyerProfile')
const Buyer=require('../models/Buyer')
const mongoose = require("mongoose")

exports.updateBuyerProfile=async(req,res)=>{
    try {
        const {
          firstName = "",
          lastName = "",
          phoneNumber = "",
          phoneCode="",
          gender = "",
          address ="",
          dateOfBirth=""
        } = req.body
        const id = req.user.id
    
        // Find the profile by id
        const userDetails = await Buyer.findById(id)
        const profile = await BuyerProfile.findById(userDetails.additionalDetail)
    
        const user = await Buyer.findByIdAndUpdate(id, {
          firstName,
          lastName,
        })
        await user.save()
    
        // Update the profile fields
        profile.dateOfBirth = dateOfBirth
        profile.phoneNumber = phoneNumber
        profile.phoneCode = phoneCode
        profile.gender = gender
        profile.address = address
    
        // Save the updated profile
        await profile.save()
    
        // Find the updated user details
        const updatedUserDetails = await Buyer.findById(id)
          .populate("additionalDetail")
          .exec()
    
        return res.json({
          success: true,
          message: "Profile updated successfully",
          updatedUserDetails,
        })
      } catch (error) {
        console.log(error)
        return res.status(500).json({
          success: false,
          error: error.message,
        })
      }
}

exports.deleteBuyerAccount = async (req, res) => {
    try {
      const id = req.user.id
      console.log(id)
      const user = await Buyer.findById({ _id: id })
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }
      // Delete Assosiated Profile with the User
      await BuyerProfile.findByIdAndDelete({
        _id: new mongoose.Types.ObjectId(user.additionalDetail),
      })
      // Now Delete User
      await Buyer.findByIdAndDelete({ _id: id })
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      })
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ success: false, message: "User Cannot be deleted successfully" })
    }
  }
  

// exports.getAllBuyerDetails = async (req, res) => {
//     try {
//       const id = req.user.id
//       const userDetails = await User.findById(id)
//         .populate("additionalDetails")
//         .exec()
//       console.log(userDetails)
//       res.status(200).json({
//         success: true,
//         message: "User Data fetched successfully",
//         data: userDetails,
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
//   }
  
  
  
exports.getPuchasedProducts = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "product",
          populate: {
            path: "seller",
          },
        })
        .exec()
     
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  