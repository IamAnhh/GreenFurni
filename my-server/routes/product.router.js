const express = require('express')
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const Product = require('../models/product')

// API

// Router lấy thông tin sản phẩm
router.get('/product', cors(), (req, res) =>
    Product.find()
    .then(data => { res.json(data) })
    .catch(error => { res.status(500).json({ err: error.mesage }) }));


//Router lấy thông tin sản phẩm theo từng phân loại
router.get('/product/bo-ban-ghe', cors(), (req, res) =>
    Product.find({ category1: "Bộ bàn ghế" })
    .then(data => { res.json(data) })
    .catch(error => { res.status(500).json({ err: error.mesage }) }));

router.get('/product/trang-tri', cors(), (req, res) =>
    Product.find({ category1: "Trang trí" })
    .then(data => { res.json(data) })
    .catch(error => { res.status(500).json({ err: error.mesage }) }));

router.get('/product/phu-kien', cors(), (req, res) =>
    Product.find({ category1: "Phụ kiện" })
    .then(data => { res.json(data) })
    .catch(error => { res.status(500).json({ err: error.mesage }) }));

//Router lấy sản phẩm theo từng mức giá
router.get('/product/duoi-100', cors(), (req, res) =>
    Product.find({ price: { $lt: 100 } })
    .then(data => { res.json(data) })
    .catch(error => { res.status(500).json({ err: error.mesage }) }));

router.get('/product/100-den-200', cors(), (req, res) =>
    Product.find({ price: { $gte: 100, $lte: 200 } })
    .then(data => { res.json(data) })
    .catch(error => { res.status(500).json({ err: error.mesage }) }));

router.get('/product/200-den-300', cors(), (req, res) =>
    Product.find({ price: { $gte: 200, $lte: 300 } })
    .then(data => { res.json(data) })
    .catch(error => { res.status(500).json({ err: error.mesage }) }));

router.get('/product/tren-300', cors(), (req, res) =>
    Product.find({ price: { $gt: 300 } })
    .then(data => { res.json(data) })
    .catch(error => { res.status(500).json({ err: error.mesage }) }));

//Router sửa thông tin sản phẩm
router.patch("/product/:id", async(req, res) => {
    try {
        await Product.updateOne({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                price: req.body.price,
                oldprice: req.body.oldprice,
                category1: req.body.category1,
                category2: req.body.category2,
                opt1: req.body.opt1,
                opt2: req.body.opt2,
                description: req.body.description,
                quantity: req.body.quantity,
                sold_quantity: req.body.sold_quantity,
                input_ask: req.body.input_ask,
                input_name: req.body.input_name,
                input_answer: req.body.input_answer
            }
        })
        res.send("Success!");
    } catch (error) {
        res.json({ error: error.mesage })
    }
})

//Router xóa sản phẩm
router.delete('/product/:id', async(req, res) => {
    try {
        const productId = req.params.id;

        // Kiểm tra xem sản phẩm có tồn tại không
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Xoá sản phẩm từ database
        await Product.deleteOne({ _id: productId });

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product on server:', error);
        res.status(500).json({ error: error.message });
    }
});

//Router thêm sản phẩm
router.post("/product", cors(), async(req, res) => {
    // Log dữ liệu nhận được từ req.body
    console.log('Received data:', req.body);

    // Tạo một đối tượng Product từ dữ liệu nhận được
    const newProduct = new Product(req.body);

    // Lưu đối tượng vào cơ sở dữ liệu
    try {
        const savedProduct = await newProduct.save();
        console.log('Product saved to database:', savedProduct);
        res.status(200).send('Product saved successfully');
    } catch (err) {
        console.error('Error saving product to database:', err);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;