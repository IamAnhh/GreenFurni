const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const CustomProduct = require('../models/customproduct')

// API 

router.get('/customProducts', async(req, res) => {
    try {
        const customproduct = await CustomProduct.find();
        res.json(customproduct);
    } catch (err) {
        res.json({ error: err.message })
    }
})

router.post('/customProducts', async(req, res) => {
    const newCustomProduct = new CustomProduct({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        productName: req.body.productName,
        description: req.body.description
    })
    try {
        const saveCustomProduct = await newCustomProduct.save();
        console.log(saveCustomProduct);
        res.send("Server received data!");
    } catch (err) {
        res.json({ message: err.message });
    }
})

module.exports = router;