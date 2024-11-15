const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    userid: { type: Number },
    tendangnhap: { type: String },
    hovaten: { type: String },
    email: { type: String },
    sdt: { type: String },
    gioitinh: { type: String },
    ngaysinh: { type: String },
    hinhdaidien: { type: String },
    matkhau: { type: String },
    diachi: [{
        tendiachi: String
    }]
});

module.exports = mongoose.model('User', User);