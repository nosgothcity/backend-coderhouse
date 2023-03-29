class ProductManager {
    constructor() {
        this.products = [];
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
        const productId = this.products.length + 1;
        const found = this.products.find(product => product.code === code);

        if(title?.length === 0 || description?.length === 0 || !price || thumbnail?.length === 0 || code.length === 0 || !stock){
            console.log(`Se deben ingresasr todos los datos para crear productos.`);
            return;
        }

        if(found){
            console.log(`El producto de codigo ${code} ya fue ingresado.`);
            return;
        } else {
            const newProduct = {
                productId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            this.products.push(newProduct);
            console.log(`El producto ${title} fue ingresado con éxito`);
        }
    }

    getProducts() {
        console.log(`Cantidad de productos creados: ${this.products.length}`);
        console.log(`Los productos creados son:`);
        console.log(this.products);
    }

    getProductById(code) {
        if(!code || code.length === 0){
            console.log(`Se debe entregar un codigo para realizar la busqueda`);
            return;
        }

        const productFound = this.products.find(product => product.code === code);
        if(!productFound){
            console.log(`No existen productos buscados por el codigo ${code}`);
        }else{
            console.log('Producto encontrado:');
            console.log(productFound);
        }
    }
  }
  
const newProduct = new ProductManager();
newProduct.addProduct('Galaxy S22 Ultra', 'Telefono celular Samsung Galaxy S22 Ultra Rojo', 800, 'imagen_samsung', 111, 5);
newProduct.addProduct('iPhone 14 Plus', 'Telefono celular Apple iPhone 14 Plus Negro', 1100, 'imagen_iphone', 112, 10);
newProduct.addProduct('HUAWEI P50', 'Telefono celular HUAWEI P50 8GB + 256GB de 6.5', 500, 'imagen_huawei', 113, 4);

// Tratando de agregar un articulo ya agregado.
newProduct.addProduct('Galaxy S22 Ultra', 'Telefono celular Samsung Galaxy', 800, 'imagen', 111, 5);

// Obteniendo todos los articulos agregados
newProduct.getProducts();

// Buscando un articulo
newProduct.getProductById(112);
newProduct.getProductById(116);
