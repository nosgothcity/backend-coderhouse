const express = require('express');
const productsRouter = require('./routes/products.router.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products', productsRouter);

app.listen(8080, () => console.log('Servidor de express arriba en el puerto 8080'));
