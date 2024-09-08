const mongoose = require('mongoose');

const Component = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    quantity: Number,
    rating: String

});



module.exports = mongoose.model('Components', Component);
