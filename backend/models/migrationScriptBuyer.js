const mongoose = require('mongoose');
const Product = require('./Product'); // Update the path to your User model

// Connect to MongoDB
mongoose.connect('bd_url', {
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
    const usersToUpdate = await Product.find({ review: { $exists: false } });
    console.log(`Found ${usersToUpdate.length} documents to update.`);

    // Update each document individually
    let updatedCount = 0;
    for (const user of usersToUpdate) {
      user.review =[];
      user.peopleRated = 0;
      user.rating = 0;
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

