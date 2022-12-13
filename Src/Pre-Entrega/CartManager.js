const fs = require('fs');

class CartManager {


    constructor() {
       this.path = './carts.json';
    }


    getId = async() => {

        const a = await fs.promises.readFile(this.path,'utf-8');
        const count = JSON.parse(a)
        const index = count.length;
        if (index == undefined) {
            return 1;
        }
        else {
            return (index + 1);
        }
    }
    


    addProduct = async(title, description, code, price,status, stock,category, thumbnails) =>{
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
                status: status,
                category: category,
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

   
}



const cart = new CartManager('carts.json')
export default cart;