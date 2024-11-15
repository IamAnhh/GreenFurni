const express = require('express')
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const Cart = require('../models/cart');
const AccountCustomer = require('../models/accountcustomer');
const Product = require('../models/product');
const Order = require('../models/order');


// Hàm 

// Hàm chung để thực hiện truy vấn dữ liệu
async function fetchData(channel, startDate, endDate) {
    const dateQuery = startDate && endDate ? { ordereddate: { $gte: startDate, $lt: endDate } } : {};
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
    console.log('dateQuery:', dateQuery);

    const orders = await Order.find({ channel, ...dateQuery }).populate({ path: 'products', model: 'Product' });
    // console.log('Orders with populated products:', orders);

    // Trả về dữ liệu đơn hàng dưới dạng JSON
    return {
        totalAmount: calculateTotalAmount(orders),
        totalOrders: orders.length,
        products: await getProductDetailsForBestSellingProduct(orders),
    };
}

// Hàm tính tổng giá trị đơn hàng
function calculateTotalAmount(orders) {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
}



// API
// GET giỏ hàng dựa trên userid
router.get('/cart/:userid', async(req, res) => {
    try {
        const userid = parseInt(req.params.userid);

        // Kiểm tra xem userid có phải là số nguyên dương không
        if (!Number.isInteger(userid) || userid <= 0) {
            return res.status(400).json({ message: 'Invalid userid' });
        }

        // Tìm kiếm giỏ hàng của người dùng dựa trên userid
        const cart = await Cart.findOne({ userid: userid });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Trả về dữ liệu giỏ hàng
        res.status(200).json({ cart: cart.cartItems, userid: userid });
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ error: error.message });
    }
});


// Xóa sản phẩm khỏi giỏ hàng
router.delete('/cart/remove/:userid/:itemid', async(req, res) => {
    try {
        const userId = parseInt(req.params.userid);
        const itemId = parseInt(req.params.itemid);

        // Kiểm tra xem userId và itemId có hợp lệ không
        if (!Number.isInteger(userId) || !Number.isInteger(itemId) || userId <= 0 || itemId <= 0) {
            return res.status(400).json({ message: 'Invalid userId or itemId' });
        }

        // Tìm giỏ hàng của người dùng
        const cart = await Cart.findOne({ userid: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Xóa sản phẩm khỏi giỏ hàng
        cart.cartItems = cart.cartItems.filter(item => item.id !== itemId);

        // Lưu thay đổi
        await cart.save();

        return res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: error.message });
    }
});


router.put('/cart/update-quantity/:userId/:itemId', async(req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const itemId = parseInt(req.params.itemId);
        const newQuantity = parseInt(req.body.quantity);

        // Kiểm tra xem userId và itemId có phải là số nguyên dương không
        if (!Number.isInteger(userId) || userId <= 0 || !Number.isInteger(itemId) || itemId <= 0) {
            return res.status(400).json({ message: 'Invalid userId or itemId' });
        }

        // Kiểm tra xem newQuantity có phải là số nguyên dương không
        if (!Number.isInteger(newQuantity) || newQuantity <= 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        // Tìm giỏ hàng của người dùng dựa trên userId
        const cart = await Cart.findOne({ userid: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Tìm sản phẩm trong giỏ hàng dựa trên itemId
        const cartItem = cart.cartItems.find((item) => item.id === itemId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Cập nhật số lượng của sản phẩm trong giỏ hàng
        cartItem.quantity = newQuantity;
        cartItem.subtotal = cartItem.price * newQuantity; // Cập nhật subtotal

        // Cập nhật giá trị subtotal cho tất cả các sản phẩm trong giỏ hàng
        cart.cartItems.forEach(item => {
            item.subtotal = item.price * item.quantity;
        });


        // Lưu giỏ hàng đã cập nhật vào cơ sở dữ liệu
        await cart.save();

        res.status(200).json({ message: 'Quantity updated successfully', cart: cart.cartItems, userId: userId });
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ error: error.message });
    }
});

// POST: Thêm sản phẩm vào giỏ hàng
router.post('/cart/add', async(req, res) => {
    try {
        const { userid, productId, quantity } = req.body;

        // Kiểm tra userid, productId và quantity là số nguyên dương
        if (!Number.isInteger(userid) || !Number.isInteger(productId) || !Number.isInteger(quantity) || userid <= 0 || productId <= 0 || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid userid, productId, or quantity' });
        }

        // Tìm sản phẩm dựa trên productId
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ message: `Product with id ${productId} not found` });
        }

        // Tìm giỏ hàng của người dùng dựa trên userid
        let cart = await Cart.findOne({ userid: userid });

        if (!cart) {
            // Tạo giỏ hàng mới nếu không tìm thấy
            const newCart = new Cart({ userid, cartItems: [] });
            await newCart.save();
            cart = newCart;
        }

        // Chuyển đổi giá trị id thành số nguyên
        const productIdAsNumber = parseInt(productId);

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItem = cart.cartItems.find((item) => item.id === productIdAsNumber);

        if (existingItem) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng
            existingItem.quantity += quantity;
            cartItem.subtotal = cartItem.price * existingItem.quantity; // Cập nhật subtotal

            // Cập nhật giá trị subtotal cho tất cả các sản phẩm trong giỏ hàng
            cart.cartItems.forEach(item => {
                item.subtotal = item.price * item.quantity;
            });
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
            cart.cartItems.push({
                id: productIdAsNumber,
                category1: product.category1,
                category2: product.category2,
                name: product.name,
                price: product.price,
                img1: product.img1,
                quantity: quantity,
                subtotal: product.price * quantity,
            });
        }
        // Cập nhật giá trị subtotal cho tất cả các sản phẩm trong giỏ hàng
        cart.cartItems.forEach(item => {
            item.subtotal = item.price * item.quantity;
        });


        // Lưu giỏ hàng đã cập nhật vào cơ sở dữ liệu
        await cart.save();

        res.status(200).json({
            message: 'Product added to cart successfully',
            cart: cart.cartItems,
            userid: userid,
        });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;