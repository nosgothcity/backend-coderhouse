const express = require('express');
const router = express.Router();
const ProductManager = require('../functions/ProductManager');
const productsManager = new ProductManager();

router.get('/', async (req, res) => {
    const allProducts = await productsManager.getProducts();
    res.render('home', {
        products: allProducts,
    });
});

module.exports = router;
