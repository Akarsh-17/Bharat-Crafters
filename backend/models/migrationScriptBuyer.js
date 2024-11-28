const mongoose = require('mongoose');
const Buyer = require('./Buyer'); // Update the path to your User model
const Cart=require("./Cart");
// Connect to MongoDB
mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{console.log('db connection success')
migrateUsers();
})
.catch((error)=>
{
    console.log('bd connection failure');
    console.error(error.message)
    process.exit(-1);
})

// Define the migration function
async function migrateUsers() {
  try {
    // Add new fields to existing documents
    console.log('Starting migration...');
    // Find documents that need to be updated
    const usersToUpdate = await Buyer.find({});
    console.log(`Found ${usersToUpdate.length} documents to update.`);

    // Update each document individually
    let updatedCount = 0;
    for (const user of usersToUpdate) {
      const newCart=new Cart();
      await newCart.save()
      user.cartSummary=0;
      user.cart=newCart._id
      await user.save();
      updatedCount++;
      console.log(updatedCount+" "+user)
    }

    console.log(`${updatedCount} documents updated.`);
    console.log('Migration completed successfully.');

    
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Call the migration function

