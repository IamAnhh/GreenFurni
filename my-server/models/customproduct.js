const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customProductSchema = new mongoose.Schema({
    Name: { type: String },
    Phonenumber: { type: String },
    Mail: { type: String },
    productName: { type: String },
    productDes: { type: String },
    productFile: { type: String }
})

const CustomProduct = mongoose.model('customproduct', customProductSchema);

module.exports = CustomProduct;