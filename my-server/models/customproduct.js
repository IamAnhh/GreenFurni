const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customProductSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    productName: { type: String },
    description: { type: String }
})

const CustomProduct = mongoose.model('customproduct', customProductSchema);

module.exports = CustomProduct;