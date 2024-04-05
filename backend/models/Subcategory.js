const mongoose = require("mongoose");

// Define the Tags schema
const subCategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	
	product: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			// required: true,
		},
	],
});

// Export the Tags model
module.exports = mongoose.model("SubCategory", subCategorySchema);
