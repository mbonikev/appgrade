const mongoose = require('mongoose');
require('dotenv').config();

const connectAndQuery = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/appgrade');
        console.log('Connected to MongoDB');

        const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
        const users = await User.find({});

        console.log('\n=== ALL USERS ===\n');
        console.log(JSON.stringify(users, null, 2));
        console.log(`\nTotal users: ${users.length}`);

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

connectAndQuery();
