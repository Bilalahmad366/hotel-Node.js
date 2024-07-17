const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

const menu = mongoose.model('menu', menuSchema);

module.exports = menu;