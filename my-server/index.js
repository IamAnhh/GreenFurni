const express = require('express')
const app = express()
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const port = 3000

const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')
app.use('/image', express.static('uploads'));
require('dotenv').config();


// Parsing data received from the client
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Connecting with mongodb
const db = require("./config/db");
db.connect();



//+++++++++Router++++++++++

const blogRouter = require('./routes/blog.router')
app.use('/', blogRouter)

const customproduct = require('./routes/customproduct.router')
app.use('/', customproduct)

const Discount = require('./routes/discount.router')
app.use('/', Discount)

const Product = require('./routes/product.router')
app.use('/', Product)

const Order = require('./routes/order.router')
app.use('/', Order)

const AccountCustomer = require('./routes/account.router')
app.use('/', AccountCustomer)

const cartRouter = require('./routes/cart.router')
app.use('/', cartRouter)

// app.use('/send-email', routes);

app.listen(port, () => {
    console.log(`My server's listening on port: ${port}`)
})