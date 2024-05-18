const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product",
        index:true,
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Buyer"
    },
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);