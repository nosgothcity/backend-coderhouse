const express = require('express');
const ProductManager = require('./productsData/ProductManager');
const productsManager = new ProductManager();
const app = express();

app.use(express.urlencoded({extended:true}));

app.get('/products', async (req, res) => {
    let allProducts = await productsManager.getProducts();
    const limit = parseInt(req.query.limit, 10);

    if(!limit || limit < 0 || isNaN(limit) || limit > allProducts.length){
        return res.send(allProducts);
    }

    allProducts.length = limit;
    res.send(allProducts);
});

app.get('/products/:pid', async (req, res) => {
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

app.listen(8080, () => console.log('Servidor de express arriba en el puerto 8080'));
