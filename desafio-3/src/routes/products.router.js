const Router = require('express');
const router = Router();
const ProductManager = require('../productsData/ProductManager');
const productsManager = new ProductManager();


router.get('/', async (req, res) => {
    let allProducts = await productsManager.getProducts();
    const limit = parseInt(req.query.limit, 10);

    if(!limit || limit < 0 || isNaN(limit) || limit > allProducts.length){
        return res.send(allProducts);
    }

    allProducts.length = limit;
    res.send(allProducts);
});

router.get('/:pid', async (req, res) => {
    const productId = req.params.pid;
    if(!productId){
        return res.send(['Product Id not found']);
    }

    const product = await productsManager.getProductById(productId);
    if(product){
        return res.send(product);
    } else {
        return res.send(['Product Id not found']);
    }
});

module.exports = router;
