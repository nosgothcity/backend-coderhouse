const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './products-list.txt';
    }
  
    async addProduct(title, description, price, thumbnail, code, stock) {
        const products = [];
        let id = 1;
        if(title?.length === 0 || description?.length === 0 || !price || thumbnail?.length === 0 || code.length === 0 || !stock){
            console.log(`Se deben ingresar todos los datos para crear productos.`);
            return;
        }

        products.push(... await this.readProductsFile());

        if(products.length > 0){
            console.log(`Verificando si el nuevo producto de code ${code} ya existe en el listado....`);
            id = products.length + 1
            const found = products.some(product => product.code === code);
            if(found){
                console.warn(`CUIDADO: El producto de codigo ${code} ya se encuentra en el archivo.`);
                return;
            }
        }

        products.push({
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        });

        await fs.promises.writeFile(this.path, JSON.stringify(products, "\n"))
            .then(() => console.log(`Agregando nuevo producto con id: ${id}`))
            .catch((error) => console.error('Error al generar archivo',error));
    }

    async getProducts() {
        const products = [];
        products.push(... await this.readProductsFile());

        if(products.length > 0){
            console.log(`Cantidad de productos creados: ${products.length}`);
            console.log(`Los productos creados son:`);
            console.log(products);    
        }
    }

    async getProductById(id) {
        const products = [];
        if(!id || id.length === 0){
            console.log(`Se debe entregar un codigo para realizar la busqueda`);
            return;
        }
        products.push(... await this.readProductsFile());

        const productFound = products.find(product => product.id === id);
        if(!productFound){
            console.log(`No existen productos con el codigo ${id}`);
        }else{
            console.log('Producto encontrado:');
            console.log(productFound);
        }
    }

    async updateProduct(id, productToUpdate) {
        const products = [];
        const productType = typeof productToUpdate;
        const productIsEmpty = Object.entries(productToUpdate).length;

        if(!id || id.length === 0){
            console.log(`Se debe entregar un id para realizar la actualizacion`);
            return;
        }

        if(productType !== 'object' || productIsEmpty === 0){
            console.log(`Se debe entregar un elemento (producto) tipo object valido para actualizar`);
            return;
        }

        products.push(... await this.readProductsFile());
        const productFound = products.find(product => product.id === id);
        if(!productFound){
            console.log(`No existen productos para actualizar con el id ${id}`);
        }else{
            productFound.title = productToUpdate.title??productFound.title;
            productFound.description = productToUpdate.description??productFound.description;
            productFound.price = productToUpdate.price??productFound.price;
            productFound.thumbnail = productToUpdate.thumbnail??productFound.thumbnail;
            productFound.code = productToUpdate.code??productFound.code;
            productFound.stock = productToUpdate.stock??productFound.stock;

            await fs.promises.writeFile(this.path, JSON.stringify(products, "\n"))
                .then(() => console.log(`Actualizando producto con id: ${id}`))
                .catch((error) => console.error('Error al generar archivo',error));
        }
    }

    async deleteProduct(id){
        const products = [];
        if(!id || id.length === 0){
            console.log(`Se debe entregar un id para eliminar un producto`);
            return;
        }

        products.push(... await this.readProductsFile());
        const productFound = products.some(product => product.id === id);
        if(!productFound){
            console.log(`No existen productos para eliminar con el id ${id}`);
        }else{
            const newProductList = products.filter(product => product.id !== id);

            await fs.promises.writeFile(this.path, JSON.stringify(newProductList, "\n"))
                .then(() => console.log(`Producto con id ${id} eliminado. Se creara un nuevo listado de productos.`))
                .catch((error) => console.error('Error al generar archivo',error));
        }
    }

    async readProductsFile(){
        return await fs.promises.readFile(this.path, 'utf-8')
            .then(result => JSON.parse(result))
            .catch(error => []);
    }
}

const productManager = new ProductManager();
const generator = async () => {
    await productManager.addProduct('Galaxy S22 Ultra', 'Telefono celular Samsung Galaxy S22 Ultra Rojo', 800, 'imagen_samsung', 111, 5);
    await productManager.addProduct('iPhone 14 Plus', 'Telefono celular Apple iPhone 14 Plus Negro', 1100, 'imagen_iphone', 112, 10);
    // await productManager.addProduct('HUAWEI P50', 'Telefono celular HUAWEI P50 8GB + 256GB de 6.5', 500, 'imagen_huawei', 113, 4);
    // // Tratando de agregar un articulo ya agregado.
    // await productManager.addProduct('Galaxy S22 Ultra', 'Telefono celular Samsung Galaxy', 800, 'imagen', 111, 5);

    // // Buscando producto
    // await productManager.getProductById(2);

    // // Lista de productos
    // await productManager.getProducts();

    // // Actualizacion de productos.
    // await productManager.updateProduct(2, {title: 'TITULO TEST', description: 'DESCRIPCION TEST'});

    // // Lista de productos para visualizar los cambios hechos anteriormente.
    // await productManager.getProducts();

    // // Lista de productos para visualizar los cambios hechos anteriormente.
    // await productManager.deleteProduct(3);

    // // Lista de productos para visualizar los cambios luego de eliminar un elemento.
    // await productManager.getProducts();
};

generator();
