const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

const Product = require("../models/product");

// API

// Router lấy thông tin sản phẩm
router.get("/product", cors(), (req, res) =>
    Product.find()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ err: error.mesage });
    })
);
router.get("/product/:id", cors(), async(req, res) => {
    const productId = req.params.id;

    console.log("Nhận yêu cầu cho ID sản phẩm:", productId);

    // Kiểm tra tính hợp lệ của ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
    }

    try {
        // Tìm sản phẩm theo ObjectId
        const product = await Product.findOne({
            _id: new mongoose.Types.ObjectId(productId),
        });

        console.log("Tìm thấy sản phẩm:", product);

        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        res.json(product);
    } catch (error) {
        console.error("Lỗi khi tìm sản phẩm:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Router lấy thông tin sản phẩm theo từng phân loại
router.get("/products/set", cors(), (req, res) =>
    Product.find({ category1: "set" })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ err: error.mesage });
    })
);

router.get("/products/chair", cors(), (req, res) =>
    Product.find({ category1: "chair" })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ err: error.mesage });
    })
);

router.get("/products/table", cors(), (req, res) =>
    Product.find({ category1: "table" })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ err: error.mesage });
    })
);

//Router lấy sản phẩm theo từng mức giá
router.get("/products/100-den-300", cors(), (req, res) =>
    Product.find({ price: { $gte: 100, $lte: 300 } })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ err: error.mesage });
    })
);

router.get("/products/300-den-500", cors(), (req, res) =>
    Product.find({ price: { $gte: 300, $lte: 500 } })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ err: error.mesage });
    })
);

router.get("/products/tren-500", cors(), (req, res) =>
    Product.find({ price: { $gt: 500 } })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ err: error.mesage });
    })
);

//Router sửa thông tin sản phẩm
const mongoose = require("mongoose");

router.patch("/product/:id", async(req, res) => {
    const productId = req.params.id;

    // Kiểm tra ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
    }

    try {
        // Lấy dữ liệu cần cập nhật từ req.body
        const updateData = {
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
            input_answer: req.body.input_answer,
        };

        // Loại bỏ các giá trị `undefined` để tránh ghi đè không cần thiết
        Object.keys(updateData).forEach(
            (key) => updateData[key] === undefined && delete updateData[key]
        );

        // Thực hiện cập nhật
        const result = await Product.updateOne({ _id: new mongoose.Types.ObjectId(productId) }, { $set: updateData });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        res.json({ message: "Cập nhật thành công!" });
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        res.status(500).json({ error: error.message });
    }
});

//Router xóa sản phẩm
router.delete("/product/:id", async(req, res) => {
    const productId = req.params.id;

    // Kiểm tra xem ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    try {
        // Tìm sản phẩm
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Xoá sản phẩm
        await Product.deleteOne({ _id: productId });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product on server:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

//Router thêm sản phẩm

router.post("/product", async(req, res) => {
    // Log dữ liệu nhận được từ client
    console.log("Received data:", req.body);

    // Lấy dữ liệu từ req.body, chỉ giữ các trường hợp lệ
    const {
        name,
        price,
        oldprice,
        category1,
        category2,
        opt1,
        opt2,
        description,
        quantity,
        sold_quantity,
        input_ask,
        input_name,
        input_answer
    } = req.body;

    // Kiểm tra dữ liệu đầu vào (trường bắt buộc)
    if (!name || !price || !category1) {
        return res.status(400).json({ message: "Name, price, and category1 are required." });
    }

    // Tạo đối tượng mới từ Product model
    const newProduct = new Product({
        name,
        price,
        oldprice,
        category1,
        category2,
        opt1,
        opt2,
        description,
        quantity,
        sold_quantity,
        input_ask,
        input_name,
        input_answer,
    });

    // Lưu sản phẩm vào database
    try {
        const savedProduct = await newProduct.save();
        console.log("Product saved to database:", savedProduct);
        res.status(201).json({
            message: "Product saved successfully",
            product: savedProduct,
        });
    } catch (error) {
        console.error("Error saving product to database:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;