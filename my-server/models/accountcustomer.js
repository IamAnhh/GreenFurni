const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const accountCustomerSchema = new mongoose.Schema({
    nickname: {
        type: String,
        default: null,
    },
    Name: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    Mail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    userid: {
        type: Number,
    },
    gender: {
        type: String,
        default: null,
    },
    dob: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: null,
    },
    addresses: [{
        country: { type: String, default: 'Việt Nam' },
        postcodeZip: { type: String, default: '' },
        province: { type: String },
        district: { type: String },
        addressDetail: { type: String },
        isDefault: { type: Boolean, default: false },
    }, ],
});

accountCustomerSchema.plugin(AutoIncrement, { inc_field: 'userid', start_seq: 1 });

// Sử dụng hook 'pre' để thực hiện logic tăng giảm chỉ số và kiểm tra địa chỉ mặc định
accountCustomerSchema.pre('save', async function(next) {
    if (!this.userid) {
        const maxUserId = await mongoose.model('AccountCustomer').findOne({}, { userid: 1 }, { sort: { userid: -1 } });
        this.userid = maxUserId ? maxUserId.userid + 1 : 1;
    }

    // Kiểm tra xem có địa chỉ mặc định không, nếu không thì đặt là địa chỉ đầu tiên làm mặc định
    if (this.addresses && Array.isArray(this.addresses) && this.addresses.length > 0) {
        const defaultAddress = this.addresses.find(address => address && address.isDefault);

        if (!defaultAddress) {
            // Đặt làm mặc định nếu là lần đầu thêm địa chỉ hoặc mảng chỉ chứa 1 địa chỉ
            this.addresses[0].isDefault = true;
        }
    }

    next();
});

const AccountCustomer = mongoose.model('AccountCustomer', accountCustomerSchema);

module.exports = AccountCustomer;