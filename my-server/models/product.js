const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    category1: { type: String },
    category2: { type: String },
    name: { type: String },
    cost_of_capital: { type: Number },
    price: { type: Number },
    oldprice: { type: Number },
    description: { type: String },
    rating: { type: Number },
    img: [{
        img1: { type: String },
        img2: { type: String },
        img3: { type: String },
        img4: { type: String }
    }],
    quantity: { type: Number },
    sold_quantity: { type: Number },
    ask1: { type: String },
    answer1: { type: String },
    ask2: { type: String },
    answer2: { type: String },
    provider: { type: String },
    origin: { type: String },
    stock_status: { type: String }
})

module.exports = mongoose.model('product', Product)