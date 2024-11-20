const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

const Discount = require("../models/discount");

// Router lấy thông tin mã giảm giá
router.get("/discount", cors(), (req, res) =>
    Discount.find()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ err: error.message });
    })
);

// // GET thông tin discount

// router.get("/discount", async (req, res) => {
//     try {
//       const discount = await Discount.find();
//       res.json(discount);
//     } catch (error) {
//       res.status(500).json({ err: error.message });
//     }
//   });

// API to get discount details by code
router.get("/discount/:code", async(req, res) => {
    try {
        // Find the discount by code
        const discount = await Discount.findOne({ code: req.params.code });

        // Check if the discount is found
        if (!discount) {
            return res.status(404).json({ error: "Discount not found" });
        }

        res.json(discount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/discount/dang-ap-dung", cors(), (req, res) =>
    Discount.find({ status: "Đang áp dụng" })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ err: error.message });
    })
);

router.get("/discount/da-len-lich", cors(), (req, res) =>
    Discount.find({ status: "Đã lên lịch" })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ err: error.message });
    })
);

router.get("/discount/da-het-han", cors(), (req, res) =>
    Discount.find({ status: "Đã hết hạn" })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ err: error.message });
    })
);

//Router sửa thông tin mã giảm giá
router.patch("/discount/:id", async(req, res) => {
    try {
        await Discount.updateOne({ _id: req.params.id }, { $set: req.body } // Chỉ cập nhật các trường có trong req.body
        );
        res.send("Success!");
    } catch (error) {
        res.json({ error: error.message });
    }
});

//Router xóa mã giảm giá
router.delete("/discount/:id", async(req, res) => {
    try {
        const discountId = req.params.id;

        // Kiểm tra xem sản phẩm có tồn tại không
        const existingDiscount = await Discount.findById(discountId);
        if (!existingDiscount) {
            return res.status(404).json({ error: "Discount not found" });
        }

        // Xoá sản phẩm từ database
        await Discount.deleteOne({ _id: discountId });

        res.json({ message: "Discount deleted successfully" });
    } catch (error) {
        console.error("Error deleting discount on server:", error);
        res.status(500).json({ error: error.message });
    }
});

//Router thêm mã giảm giá
router.post("/discount", cors(), async(req, res) => {
    // Log dữ liệu nhận được từ req.body
    console.log("Received data:", req.body);

    // Tạo một đối tượng Product từ dữ liệu nhận được
    const newDiscount = new Discount(req.body);

    // Lưu đối tượng vào cơ sở dữ liệu
    try {
        const savedDiscount = await newDiscount.save();
        console.log("Discount saved to database:", savedDiscount);
        res.status(200).send("Discount saved successfully");
    } catch (err) {
        console.error("Error saving discount to database:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Đường dẫn PATCH để cập nhật userids cho một mã giảm giá dựa trên code
router.patch("/discount/:code", async(req, res) => {
    try {
        // Tìm mã giảm giá theo code
        const discount = await Discount.findOne({ code: req.params.code });

        // Kiểm tra xem có tìm thấy mã giảm giá hay không
        if (!discount) {
            return res.status(404).json({ error: "Không tìm thấy mã giảm giá" });
        }

        // Cập nhật userids dựa trên req.body.userid
        if (req.body.userid) {
            // Kiểm tra xem userid có trong mảng userids chưa
            if (!discount.userids.find((user) => user.userid === req.body.userid)) {
                discount.userids.push({ userid: req.body.userid });
            }
        }

        // Lưu lại mã giảm giá đã cập nhật
        const updatedDiscount = await discount.save();

        res.json(updatedDiscount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;