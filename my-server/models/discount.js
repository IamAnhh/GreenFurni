const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscountSchema = new mongoose.Schema({
    code: { type: String },
    title: { type: String },
    description: { type: String },
    status: { type: String },
    activate_date: { type: String },
    expired_date: { type: String },
    // giá trị giảm giá
    valuecode: { type: Number },
    // điều kiện ví dụ đơn hàng trên 500
    condition: { type: Number },
    // số lượng
    quantity: { type: Number },
    userids: [{
        userid: { type: Number }
    }],
    createAt: { type: Date, default: Date.now }
});
const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = Discount;