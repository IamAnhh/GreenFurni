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
        Name: req.params.Name,
        Phonenumber: req.params.Phonenumber,
        Mail: req.params.Mail,
        productName: req.params.productName,
        productDes: req.params.productDes,
        productFile: req.params.productFile
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