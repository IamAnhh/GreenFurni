const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

const Order = require("../models/order");

// API

router.get("/order", async(req, res) => {
    try {
        const orders = await Order.find().populate({
            path: "products",
            model: "Product",
        });
        res.json.apply(orders);
    } catch (err) {
        res.status(500).json({ err: error.message });
    }
});

router.get("/orders", async(req, res) => {
    try {
        const orders = await Order.find().populate({
            path: "products",
            model: "Product",
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
});

// Router cho lấy đơn hàng theo userid
router.get("/orders/user/:userid", async(req, res) => {
    try {
        const orders = await Order.find({ userid: req.params.userid }).populate({
            path: "products",
            model: "Product",
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
});

// Router để lấy danh sách mã đơn hàng của một người dùng
// ví dụ orders/user/123/5
// là orderId là 5 , userId là 123
router.get("/orders/user/:userid/:ordernumber", async(req, res) => {
    try {
        const { userid, ordernumber } = req.params;

        // Truy vấn để lấy đơn hàng cụ thể của người dùng
        const order = await Order.findOne({ userid, ordernumber }).populate({
            path: "products",
            model: "Product",
        });

        if (!order) {
            console.log(
                `Order not found for ordernumber ${ordernumber} and userid ${userid}`
            );
            return res.status(404).json({ err: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
});

//  Router để lấy đơn hàng theo ordernumber
router.get("/orders/:ordernumber", async(req, res) => {
    try {
        const ordernumber = req.params.ordernumber;

        // Truy vấn để lấy đơn hàng cụ thể theo ordernumber
        const order = await Order.findOne({ ordernumber }).populate({
            path: "products",
            model: "Product",
        });

        if (!order) {
            console.log(`Order not found for ordernumber ${ordernumber}`);
            return res.status(404).json({ err: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
});

// Lấy danh sách sản phẩm trong order
router.get("/orders/user/:userid/:ordernumber/products", async(req, res) => {
    try {
        const { userid, ordernumber } = req.params;

        // Truy vấn để lấy đơn hàng cụ thể của người dùng
        const order = await Order.findOne({ userid, ordernumber }).populate({
            path: "products",
            model: "Product",
        });

        if (!order) {
            console.log(
                `Order not found for ordernumber ${ordernumber} and userid ${userid}`
            );
            return res.status(404).json({ err: "Order not found" });
        }

        // Trả về danh sách sản phẩm trong đơn hàng
        res.json(order.products);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
});

// Cụ thể 1 product
router.get(
    "/orders/user/:userid/:ordernumber/products/:productid",
    async(req, res) => {
        try {
            const { userid, ordernumber, productid } = req.params;

            // Truy vấn để lấy đơn hàng cụ thể của người dùng
            const order = await Order.findOne({ userid, ordernumber }).populate({
                path: "products",
                model: "Product",
            });

            if (!order) {
                console.log(
                    `Order not found for ordernumber ${ordernumber} and userid ${userid}`
                );
                return res.status(404).json({ err: "Order not found" });
            }

            // Tìm kiếm sản phẩm trong danh sách sản phẩm của đơn hàng
            const product = order.products.find(
                (product) => product.id === parseInt(productid)
            );

            if (!product) {
                console.log(
                    `Product not found for productid ${productid} in order ${ordernumber}`
                );
                return res.status(404).json({ err: "Product not found" });
            }

            // Trả về thông tin của sản phẩm cụ thể
            res.json(product);
        } catch (error) {
            res.status(500).json({ err: error.message });
        }
    }
);



// Cập nhật order
router.patch("/orders/user/:userid/:ordernumber", async(req, res) => {
    try {
        const { userid, ordernumber } = req.params;

        // Tìm đơn hàng theo userid và ordernumber
        const orderToUpdate = await Order.findOne({ userid, ordernumber });

        if (!orderToUpdate) {
            return res.status(404).json({ err: "Order not found" });
        }

        // Cập nhật các trường thông tin
        if (req.body.order_status) {
            orderToUpdate.order_status = req.body.order_status;
        }

        if (req.body.paymentstatus) {
            orderToUpdate.paymentstatus = req.body.paymentstatus;
        }

        if (req.body.feedback) {
            orderToUpdate.feedback = req.body.feedback;
        }

        if (req.body.rejectreason) {
            orderToUpdate.rejectreason = req.body.rejectreason;
        }

        // Lưu các thay đổi
        await orderToUpdate.save();

        // Trả về đơn hàng đã được cập nhật
        const updatedOrder = await Order.findOne({ userid, ordernumber }).populate({
            path: "products",
            model: "Product",
        });
        res.json(updatedOrder);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ err: error.message });
    }
});

router.put("/orders/user/:userid/:ordernumber", async(req, res) => {
    try {
        const { userid, ordernumber } = req.params;

        // Tìm đơn hàng theo userid và ordernumber
        const orderToUpdate = await Order.findOne({ userid, ordernumber });

        if (!orderToUpdate) {
            return res.status(404).json({ err: "Order not found" });
        }

        // Cập nhật các trường thông tin
        orderToUpdate.order_status =
            req.body.order_status || orderToUpdate.order_status;
        orderToUpdate.paymentstatus =
            req.body.paymentstatus || orderToUpdate.paymentstatus;
        orderToUpdate.feedback = req.body.feedback || orderToUpdate.feedback;
        orderToUpdate.rejectreason =
            req.body.rejectreason || orderToUpdate.rejectreason;

        // Lưu các thay đổi
        await orderToUpdate.save();

        // Trả về đơn hàng đã được cập nhật
        const updatedOrder = await Order.findOne({ userid, ordernumber }).populate({
            path: "products",
            model: "Product",
        });
        res.json(updatedOrder);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ err: error.message });
    }
});

// Cập nhật sản phẩm trong order
router.patch(
    "/orders/user/:userid/:ordernumber/products/:productid",
    async(req, res) => {
        try {
            const { userid, ordernumber, productid } = req.params;

            // Truy vấn để lấy đơn hàng cụ thể của người dùng
            const order = await Order.findOne({ userid, ordernumber }).populate({
                path: "products",
                model: "Product",
            });

            if (!order) {
                console.log(
                    `Order not found for ordernumber ${ordernumber} and userid ${userid}`
                );
                return res.status(404).json({ err: "Order not found" });
            }

            // Tìm kiếm sản phẩm trong danh sách sản phẩm của đơn hàng
            const product = order.products.find(
                (product) => product.id === parseInt(productid)
            );

            if (!product) {
                console.log(
                    `Product not found for productid ${productid} in order ${ordernumber}`
                );
                return res.status(404).json({ err: "Product not found" });
            }

            // Cập nhật các trường thông tin nếu có trong body của PATCH request
            if (req.body.quantity !== undefined) {
                product.quantity = req.body.quantity;
            }

            if (req.body.feedback !== undefined) {
                product.feedback = req.body.feedback;
            }

            // Lưu các thay đổi
            await order.save();

            // Trả về thông tin đã cập nhật của sản phẩm
            res.json(product);
        } catch (error) {
            res.status(500).json({ err: error.message });
        }
    }
);

module.exports = router;