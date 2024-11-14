const express = require('express')
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const AccountCustomer = require('../models/accountcustomer')

// API

// Xử lý route đăng ký

router.get("/accounts", cors(), async(req, res) => {
    const customers = await AccountCustomer.find({}).lean();
    res.send(customers);
});

router.post("/account", cors(), async(req, res) => {
    try {
        const customers = await AccountCustomer.find({}).lean(); // Sử dụng lean() để trả về dữ liệu dưới dạng JavaScript object thay vì document Mongoose
        res.send(customers);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ err: error.message });
    }
});

router.post('/accounts', async(req, res) => {
    try {
        // Nhận dữ liệu từ request body
        const { Name, phonenumber, Mail, password } = req.body;

        // Tạo một instance mới của AccountCustomer từ dữ liệu nhận được
        const newAccount = new AccountCustomer({
            Name,
            phonenumber,
            Mail,
            password
        });

        // Lưu account mới vào database
        const savedAccount = await newAccount.save();

        res.status(201).json(savedAccount); // Trả về thông tin của account vừa tạo
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API đăng nhập
router.post('/login', cors(), async(req, res) => {
    try {
        const { Mail, password } = req.body;

        // Tìm kiếm tài khoản với email tương ứng
        const user = await AccountCustomer.findOne({ Mail });

        if (!user) {
            return res.status(401).json({ message: 'Email không tồn tại' });
        }

        // Kiểm tra mật khẩu
        const isPasswordMatch = password === user.password;
        if (isPasswordMatch) {
            // Đăng nhập thành công
            // res.status(200).json({ message: 'Đăng nhập thành công', user: { ...user.toObject()} });
            res.status(200).json({...user.toObject() });
        } else {
            // Mật khẩu không đúng
            res.status(401).json({ message: 'Mật khẩu không đúng' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});


router.get("/accounts/:Mail", cors(), async(req, res) => {

    try {
        const phone = req.params.Mail;
        const user = await AccountCustomer.findOne({ Mail: phone });
        res.send(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});









// MANGE ACCOUNT
// GET tất cả admin có role là 'admin'
router.get('/adminaccs', async(req, res) => {
    try {
        const adminAccs = await AccountCustomer.find({ role: 'admin' });
        res.json(adminAccs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST 1 admin mới vào database
router.post('/addadmin', async(req, res) => {
    try {
        // Nhận dữ liệu từ request body
        const { Name, phonenumber, Mail, password } = req.body;

        // Tạo một instance mới của AccountCustomer từ dữ liệu nhận được
        const newAccount = new AccountCustomer({
            Name,
            phonenumber,
            Mail,
            password,
            role: 'admin'
        });

        // Lưu account mới vào database
        const savedAccount = await newAccount.save();

        res.status(201).json(savedAccount); // Trả về thông tin của account vừa tạo
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update thông tin account
router.put('/updateadmin/:id', async(req, res) => {
    try {
        const accountId = req.params.id;

        // Kiểm tra xem account có tồn tại không
        const existingAccount = await AccountCustomer.findById(accountId);
        if (!existingAccount) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Nhận dữ liệu cần cập nhật từ request body
        const { Name, phonenumber, Mail } = req.body;

        // Cập nhật thông tin account
        existingAccount.Name = Name || existingAccount.Name;
        existingAccount.phonenumber = phonenumber || existingAccount.phonenumber;
        existingAccount.Mail = Mail || existingAccount.Mail;

        // Lưu thông tin account đã cập nhật vào database
        const updatedAccount = await existingAccount.save();

        res.json(updatedAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE xoá một admin theo id
router.delete('/deleteadmin/:id', async(req, res) => {
    try {
        const accountId = req.params.id;

        // Kiểm tra xem account có tồn tại không
        const existingAccount = await AccountCustomer.findById(accountId);
        if (!existingAccount) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Xoá tài khoản admin từ database
        const deletedAccount = await AccountCustomer.findByIdAndDelete(accountId);

        if (!deletedAccount) {
            return res.status(404).json({ error: 'Account not found' });
        }

        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});











// Trang tài khoản bên client
// GET thông tin của một accountcustomer dựa trên id
router.get('/my-account/:id', async(req, res) => {
    try {
        const accountId = req.params.id;
        const account = await AccountCustomer.findById(accountId);

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Trả về thông tin cần thiết
        const accountInfo = {
            _id: account._id,
            nickname: account.nickname,
            Name: account.Name,
            phonenumber: account.phonenumber,
            Mail: account.Mail,
            gender: account.gender,
            dob: account.dob,
            avatar: account.avatar,
            userid: account.userid,
            addresses: account.addresses,
        };

        res.json(accountInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT để cập nhật thông tin của một accountcustomer
router.put('/my-account/:id', async(req, res) => {
    try {
        const accountId = req.params.id;
        const updatedInfo = req.body; // Body của yêu cầu sẽ chứa các thông tin cần cập nhật

        const account = await AccountCustomer.findByIdAndUpdate(accountId, updatedInfo, { new: true });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        res.json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST để thêm địa chỉ mới
router.post('/add-address/:userId', async(req, res) => {
    const userId = req.params.userId;
    const { province, district, addressDetail } = req.body;

    try {
        // Tìm tài khoản theo userId
        const account = await AccountCustomer.findOne({ _id: userId });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Thêm địa chỉ mới vào danh sách địa chỉ của tài khoản
        account.addresses.push({
            province: province,
            district: district,
            addressDetail: addressDetail,
            isDefault: false,
        });

        // Lưu tài khoản sau khi thêm địa chỉ mới
        const updatedAccount = await account.save();

        return res.status(200).json(updatedAccount);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Chỉnh sửa địa chỉ theo userId và index của địa chỉ
router.put('/edit-address/:userId/:index', async(req, res) => {
    const userId = req.params.userId;
    const index = req.params.index;
    const { province, district, addressDetail } = req.body;

    try {
        const account = await AccountCustomer.findOne({ _id: userId });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Kiểm tra xem index có hợp lệ không
        if (index < 0 || index >= account.addresses.length) {
            return res.status(400).json({ error: 'Invalid address index' });
        }

        // Chỉnh sửa địa chỉ theo index
        const addressToUpdate = account.addresses[index];
        addressToUpdate.province = province;
        addressToUpdate.district = district;
        addressToUpdate.addressDetail = addressDetail;

        // Lưu tài khoản sau khi chỉnh sửa địa chỉ
        const updatedAccount = await account.save();

        return res.status(200).json(updatedAccount);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Xoá địa chỉ theo userId và index của địa chỉ
router.delete('/delete-address/:userId/:index', async(req, res) => {
    const userId = req.params.userId;
    const index = req.params.index;

    try {
        const account = await AccountCustomer.findOne({ _id: userId });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Kiểm tra xem index có hợp lệ không
        if (index < 0 || index >= account.addresses.length) {
            return res.status(400).json({ error: 'Invalid address index' });
        }

        // Xoá địa chỉ theo index
        account.addresses.splice(index, 1);

        // Lưu tài khoản sau khi xoá địa chỉ
        const updatedAccount = await account.save();

        return res.status(200).json(updatedAccount);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Đặt địa chỉ làm mặc định theo userId và index của địa chỉ
router.put('/set-default-address/:userId/:index', async(req, res) => {
    const userId = req.params.userId;
    const index = req.params.index;

    try {
        const account = await AccountCustomer.findOne({ _id: userId });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Kiểm tra xem index có hợp lệ không
        if (index < 0 || index >= account.addresses.length) {
            return res.status(400).json({ error: 'Invalid address index' });
        }

        // Đặt địa chỉ làm mặc định
        const selectedAddress = account.addresses[index];
        account.addresses.forEach(address => {
            address.isDefault = false;
        });
        selectedAddress.isDefault = true;

        // Lưu tài khoản sau khi đặt địa chỉ làm mặc định
        const updatedAccount = await account.save();

        return res.status(200).json(updatedAccount);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;