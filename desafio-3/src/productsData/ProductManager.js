const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './src/productsData/products-list.txt';
    }
  
    async getProducts() {
        const products = [];
        products.push(... await this.readProductsFile());
        return products;
    }

    async getProductById(id) {
        const products = [];
        products.push(... await this.readProductsFile());
        const productFound = products.find(product => product.id === parseInt(id, 10));
        return productFound;
    }

    async readProductsFile(){
        return await fs.promises.readFile(this.path, 'utf-8')
            .then(result => JSON.parse(result))
            .catch(error => []);
    }
}

module.exports = ProductManager;
