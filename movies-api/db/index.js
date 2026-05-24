// Initialize MongoDB connection using Mongoose
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;

// Log database connection errors
db.on('error', (err) => {
    console.log(`database connection error: ${err}`);
});

// Log when database is disconnected
db.on('disconnected', () => {
    console.log('database disconnected');
});

// Log successful connection with database name and host
db.once('open', () => {
    console.log(`database connected to ${db.name} on ${db.host}`);
});
