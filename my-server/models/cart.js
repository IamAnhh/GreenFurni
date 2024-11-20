const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userid: {
        type: Number, // Chuyển đổi thành String
        required: true,
        unique: true,
    },
    cartItems: [{
        id: {
            type: Number,
            required: true,
        },
        category1: String,
        category2: String,
        name: String,
        subtotal: { type: Number },
        price: Number,
        quantity: {
            type: Number,
            required: true,
        },
        img1: String,
    }],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;