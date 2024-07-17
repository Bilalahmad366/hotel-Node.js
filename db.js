const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected!');
});
db.on('disconnected', () => {
    console.log('mongo db disconnected!');
});

db.on('error', (error) => {
    console.error('MongoDB connection error: ' ,error);
});

module.exports = db;
