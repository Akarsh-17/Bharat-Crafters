const Buyer=require('../models/Buyer')
const Seller=require('../models/Seller')
const Review=require('../models/RatingandReview')
const Product=require('../models/Product')

exports.getReviewById=async(req,res)=>{
    try{
        const review = await Review.find({ product: req.params.id }).populate(
          "buyer"
        );
        return res.status(200).json({
            success:true,
            data:review,
            message:"review fetched successfully"
        });
    }
    catch(error)
    {
        console.log(`Can't get product reviews : ${error}`);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to retrieve Product review"
        });
    }
}


exports.addReview = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: `Could not find product with id: ${productId}`,
      });
    }

    // Check if the user is the seller of the product
    if (userId === product.seller.toString()) {
      return res.status(401).json({
        success: false,
        message: "Seller cannot add review",
      });
    }

    // Fetch buyer information
    const buyer = await Buyer.findById(userId);
    if (!buyer) {
      return res.status(400).json({
        success: false,
        message: `Could not find buyer with id: ${userId}`,
      });
    }

    // Check if product ID exists in buyer.product array
    if (!buyer.product.includes(productId)) {
      return res.status(403).json({
        success: false,
        message: "Cannot add review for a product not purchased by the buyer",
      });
    }

    // Check if a review by the buyer for the same product already exists
    const existingReview = await Review.find({
      buyer: userId,
      product: productId,
    });

    if (existingReview.length !== 0) {
      return res.status(406).json("Review already exists.");
    }

    const review = new Review({
      ...req.body,
      buyer: userId,
    });

    const savedReview = await review.save();

    await Buyer.findByIdAndUpdate(userId, {
      $push: { review: savedReview._id },
    });

    await Product.findByIdAndUpdate(productId, {
      $set: {
        rating:
          (product.rating * product.peopleRated + savedReview.star) /
          (product.peopleRated + 1),
      },
      $inc: { peopleRated: 1 },
      $push: { review: savedReview._id },
    });

    return res.status(200).json({
      success: true,
      message: "Successfully added the review.",
    });
  } catch (err) {
    console.log(`Can't add review: ${err}`);
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to add product review",
    });
  }
};


  
exports.deleteReview = async (req, res) => 
{
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(400).json({
            success: false,
            message: `Could not find product with id: ${productId}`,
          });
        }
    
        // Check if the user is the seller of the product
        if (userId === product.seller.toString()) {
          return res.status(401).json({
            success: false,
            message: "Seller cannot update review",
          });
        }
    
        // Fetch buyer information
        const buyer = await Buyer.findById(userId);
        if (!buyer) {
          return res.status(400).json({
            success: false,
            message: `Could not find buyer with id: ${userId}`,
          });
        }
    
        // Check if product ID exists in buyer.product array
        if (!buyer.product.includes(productId)) {
          return res.status(403).json({
            success: false,
            message: "Cannot remove review for a product not purchased by the buyer",
          });
        }
    
        // Check if a review by the buyer for the same product already exists
        const existingReview = await Review.findOne({
          buyer: userId,
          product: productId,
        });
    
        if (!existingReview) {
          return res.status(404).json({
            success: false,
            message: "Review does not exist.",
          });
        }
        
        await Buyer.findByIdAndUpdate(
            userId,
            {
              $pull: {
                review: existingReview._id,
              },
            },
            { new: true }
        )
    
        // Update the product rating and review
        await Product.findByIdAndUpdate(productId, {
            $set: {
              rating:
                product.peopleRated === 1
                  ? 0
                  : (product.rating * product.peopleRated - existingReview.star) /
                    (product.peopleRated - 1),
            },
            $inc: { peopleRated: -1 },
            $pull: {
              review: existingReview[0]._id,
            },
        });

        await Review.findByIdAndDelete(existingReview._id);
        return res.status(200).json({
          success: true,
          message: "Successfully removed the review.",
          review: updatedReview,
        });
    }   
    catch (err) {
        console.log(`Can't remove review: ${err}`);
        return res.status(500).json({
          success: false,
          error: err.message,
          message: "Failed to remove product review",
        });
      }
};


exports.updateReview = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: `Could not find product with id: ${productId}`,
      });
    }

    // Check if the user is the seller of the product
    if (userId === product.seller.toString()) {
      return res.status(401).json({
        success: false,
        message: "Seller cannot update review",
      });
    }

    // Fetch buyer information
    const buyer = await Buyer.findById(userId);
    if (!buyer) {
      return res.status(400).json({
        success: false,
        message: `Could not find buyer with id: ${userId}`,
      });
    }

    // Check if product ID exists in buyer.product array
    if (!buyer.product.includes(productId)) {
      return res.status(403).json({
        success: false,
        message: "Cannot update review for a product not purchased by the buyer",
      });
    }

    // Check if a review by the buyer for the same product already exists
    const existingReview = await Review.findOne({
      buyer: userId,
      product: productId,
    });

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Review does not exist.",
      });
    }

    // Update the product rating and review
    await Product.findByIdAndUpdate(productId, {
      $set: {
        rating:
          (product.rating * product.peopleRated - existingReview.star + req.body.star) /
          product.peopleRated,
      },
    });

    const updatedReview = await Review.findByIdAndUpdate(
      existingReview._id,
      {
        $set: {
          star: req.body.star,
          review: req.body.review,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Successfully updated the review.",
      review: updatedReview,
    });
  } catch (err) {
    console.log(`Can't update review: ${err}`);
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to update product review",
    });
  }
};
