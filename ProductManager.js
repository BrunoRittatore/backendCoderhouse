class ProductManager {


    constructor() {
        this.baseDatos = [];

    }
    getProducts() {
        return this.baseDatos;
    }

    getId = () => {const count = this.baseDatos.length
        if (count == 0) {
            return 1;
        }
        else {
            return (this.baseDatos.length + 1);
        }

    }
    checkCode = (code) => {
        if((this.baseDatos.find(product => product.code == code)) == undefined) {
            console.log('Error in adding product: Repeated Code. ');
            return false;
        }
        return true;
    }


    addProduct = (title, description, code, price, stock, thumbnails) =>{
        const id = this.getId();
       const  checking = checkCode(code);
        if (checking){
            const product = {
                id,
                title,
                description,
                code,
                price,
                stock,
                thumbnails
            }
            this.baseDatos.push(product);
        }
        
    }


    getProductById = (id) => {
        const product = this.baseDatos.find(product => product.id == id);
        return product;
    }

}
const Products = new ProductManager();
Products.getProducts();
Products.addProduct('product test', 'Testing Product', '200', 500, 10, 'empty');
Products.getProducts();
Products.addProduct('product test', 'Testing Product', '200', 500, 10, 'empty');
products.getProductById(2);
products.getProductById(1);