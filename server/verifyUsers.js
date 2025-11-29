const mongoose = require('mongoose');
require('dotenv').config();

const connectAndQuery = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/appgrade');
        console.log('Connected to MongoDB');

        const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
        const users = await User.find({});

        console.log('\n=== ALL USERS ===\n');
        users.forEach(user => {
            console.log(`ID: ${user._id} (Type: ${typeof user._id})`);
            console.log(`Name: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log('-------------------');
        });
        console.log(`\nTotal users: ${users.length}`);

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

connectAndQuery();
