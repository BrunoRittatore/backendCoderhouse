const fs = require('fs');

class ProductManager {


    constructor() {
       this.path = './database.json';
    }
    getProducts = async () => {
       if(fs.existsSync(this.path)){
        const resolve = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(resolve);
        return products;
       }
           else {
            return [];
           }
        
    }

    getId = async() => {
        const count =  await JSON.parse(fs.promises.readFile(this.path,'utf-8'));
        const index = count.length;

        if (index == undefined) {
            return 1;
        }
        else {
            return (index + 1);
        }
    }
    


    addProduct = async(title, description, code, price, stock, thumbnails) =>{
        const id = await this.getId();
        const  checking = this.checkCode(code);
        if (checking){
            const product = {
                id: id,
                title: title,
                description: description,
                code: code,
                price: price,
                stock: stock,
                thumbnails: thumbnails
            }
            await fs.promises.writeFile(this.path, JSON.stringify([ product ]));
            console.log(`The product ${product.title} has been added to the database.`);
        }
    }
    checkCode = async (code) => {
        
        const DBJason = await fs.promises.readFile(this.path, 'utf-8');
        const DBObject = JSON.parse(DBJason);
        const checkCode = DBObject.some((product) => product.code === code);
        if(checkCode == undefined) {
            return true;
        }
        console.log(`Error in adding product ${product.title} : Repeated Code.`);
        return false;
    }


    getProductById = async (id) => {
        const DBJason = await fs.promises.readFile(this.path , 'utf-8');
        const DBObject = JSON.parse(DBJason);
        const search = DBObject.find((product) => product.id === id);
        return search !== undefined ? search : console.log(`The product ${product.title} was not found in the database`);
    }


    updateProduct = async (id,object) => {
      
            const databaseJson = await fs.promises.readFile(this.path, "utf-8");
            const databaseObj = JSON.parse(databaseJson);
            const productUpdate = databaseObj.find((product) => product.id === id);
            const productsNotUpdate = databaseObj.filter((product) => product.id !== id);
            const productWithChanges = { id: productUpdate.id, ...object };
            filteredProducts.push(productWithChanges);
            await fs.promises.writeFile(this.path, JSON.stringify(productsNotUpdate));
    }

    deleteProduct = async (id) => {
        const DBJson = await fs.promises.readFile(this.path, "utf-8");
        const DBObject = JSON.parse(DBJson);
        const deleteProduct = DBObject.filter((product) => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct));
      }
}


// Instancias de test



const test1 = new ProductManager("./databasejson");

test1.getProducts()
    .then ((products) => {
        const result = JSON.parse(products);
        console.log(result);
    });

test1.addProduct(
  "Test Product",
  "This is product test",
  200,
  "Without image",
  "abc123",
  25
);

test1.getProducts()
    .then ((products) => {
        const result = JSON.parse(products);
        console.log(result);
    });

    test1.getProductById(1) 
        .then((product)=> {
            console.log(product);
        });

const updateProduct = {
  title: "Update Product",
  description: "This is the update product",
  price: 250,
  thumbnail: "Without Image",
  code: "abc123",
  stock: 50,
};
test1.updateProduct(1, updateProduct);
test1.deleteProduct(1);
test1.getProducts()
    .then ((products) => {
        const result = JSON.parse(products);
        console.log(result);
    });