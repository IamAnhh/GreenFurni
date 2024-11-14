const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Adress = new Schema({
    country: { type: String, default: 'Việt Nam' },
    province: { type: String, default: '' },
    district: { type: String, default: '' },
    addressDetail: { type: String, default: '' }
});

const Order = new Schema({
    userid: { type: Number },
    ordernumber: { type: Number, unique: true },
    order_status: { type: String, default: 'Chờ xử lý' },
    ordereddate: { type: Date, default: Date.now },
    shippingfee: { type: Number },
    totalOrderValue: { type: Number },
    discount: { type: Number },
    totalAmount: { type: Number },
    ordernote: { type: String },
    adress: Adress,
    products: [{
        id: { type: Number },
        category1: { type: String },
        category2: { type: String },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        feedback: { type: String, default: '' },
        img1: { type: String },
    }],
    rejectreason: { type: String, default: '' },
    clientInfo: {
        clientname: { type: String },
        clientphone: { type: String },
        clientemail: { type: String },
    }
})

Order.pre('save', async function(next) {
    if (!this.ordernumber) {
        // Nếu ordernumber không tồn tại, thực hiện logic tăng giảm chỉ số
        const maxordernumber = await mongoose.model('Order').findOne({}, { ordernumber: 1 }, { sort: { ordernumber: -1 } });
        this.ordernumber = maxordernumber ? maxordernumber.ordernumber + 1 : 1;
    }

    next();
});

module.exports = mongoose.model('Order', Order);