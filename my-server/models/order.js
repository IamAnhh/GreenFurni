const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Adress = new Schema({
    country: { type: String, default: 'Việt Nam' },
    postcodeZip: { type: String, default: '' },
    province: { type: String, default: '' },
    district: { type: String, default: '' },
    addressDetail: { type: String, default: '' }
})

const Order = new Schema({
    userid: Number,
    channel: { type: String, default: 'Website' },
    ordernumber: { type: Number, unique: true },
    order_status: { type: String, default: 'Chờ xử lí' },
    ordereddate: { type: Date, default: Date.now },
    paymentmethod: String,
    paymentstatus: { type: Boolean, default: false },
    shippingfee: Number,
    totalOrderValue: Number,
    discount: Number,
    totalAmount: Number,
    ordernote: String,
    adress: Adress,
    products: [{
        id: Number,
        category1: String,
        category2: String,
        name: String,
        price: Number,
        quantity: Number,
        feedback: { type: String, default: '' },
        img1: String,
    }],
    rejectreason: { type: String, default: '' },
    clientInfo: {
        clientname: String,
        clientphone: String,
        clientemail: String,
    }
});


Order.pre('save', async function(next) {
    if (!this.ordernumber) {
        // Nếu ordernumber không tồn tại, thực hiện logic tăng giảm chỉ số
        const maxordernumber = await mongoose.model('Order').findOne({}, { ordernumber: 1 }, { sort: { ordernumber: -1 } });
        this.ordernumber = maxordernumber ? maxordernumber.ordernumber + 1 : 1;
    }

    next();
});



module.exports = mongoose.model('Order', Order);
// Order.plugin(AutoIncrement, {inc_field: 'ordernumber', start_seq: 1007})