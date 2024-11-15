const express = require('express')
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // Import Multer

const Blog = require('../models/blog');

// Cấu hình Multer để lưu tệp vào thư mục 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Chỉ định thư mục lưu trữ tệp
    },
    filename: (req, file, cb) => {
        // Đặt tên tệp là tên gốc cộng với thời gian hiện tại để tránh trùng tên
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// API để lấy tất cả bài viết
router.get('/blog', async(req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// API để lấy chi tiết blog theo id
router.get('/blog/:id', async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// API tạo bài viết mới và lưu ảnh
router.post('/createBlog', async(req, res) => {
    console.log(req.body.thumbnail); // Kiểm tra giá trị thumbnail nhận được từ client

    const newBlog = new Blog({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        thumbnail: req.body.thumbnail, // Kiểm tra thumbnail tại đây
    });

    try {
        const saveBlog = await newBlog.save();
        console.log(saveBlog);
        res.send("Server received data!");
    } catch (err) {
        res.json({ message: err.message });
    }
});


// Router để cập nhật blog và thay đổi hình ảnh (nếu có)
router.patch('/blog/:id', upload.single('thumbnail'), async(req, res) => {
    try {
        const updateData = {};

        // Kiểm tra giá trị của từng trường trong req.body và chỉ cập nhật nếu nó hợp lệ
        if (req.body.title && typeof req.body.title === 'string' && req.body.title.trim() !== '') {
            updateData.title = req.body.title;
        }
        if (req.body.author && typeof req.body.author === 'string' && req.body.author.trim() !== '') {
            updateData.author = req.body.author;
        }
        if (req.body.content && typeof req.body.content === 'string' && req.body.content.trim() !== '') {
            updateData.content = req.body.content;
        }

        // Nếu có hình ảnh, thay đổi tên tệp mới
        if (req.file) {
            updateData.thumbnail = req.file.filename; // Cập nhật tệp hình ảnh mới
        }

        // Nếu không có trường hợp hợp lệ nào, trả về lỗi
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No valid fields to update' });
        }

        // Cập nhật bài viết
        const updatedBlog = await Blog.updateOne({ _id: req.params.id }, { $set: updateData });

        // Kiểm tra nếu không có thay đổi nào được thực hiện
        if (updatedBlog.nModified === 0) {
            return res.status(404).json({ message: 'Blog not found or no changes made' });
        }

        res.json({ status: 'success', updatedBlog });
    } catch (err) {
        res.json({ message: err.message });
    }
});

// API xóa blog
router.delete('/:id', async(req, res) => {
    try {
        const result = await Blog.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;