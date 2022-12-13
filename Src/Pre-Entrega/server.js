const ProductManager = require("../Desafio2/ProductManager");
const express = require('express');
const app = express();
const products = []
const PORT = 8080;
const productManager = new ProductManager("productos.json");
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/', (req, res) => {
    res.send('Hi Express Server!')
});

app.get('/api/products', async (req, res) => {
    try{
        const {limit,skip} = req.query;

    const allProducts = await ProductManager.getProducts();
    if (!limit || limit < 0) {
        res.send({success: true, product: allProducts});
    }
    const products = allProducts.slice(skip ?? 0 , limit + skip);

    res.send({success: true, product: products});
    }catch(err) {
        console.error(err);
        res.send({success: false,error: 'Ocurrio un error'})
    }
    
});

app.get('/api/products/:id', async (req, res) => {
   try{
    const { id: paramId } = req.params;
    const id = Number(id);
    if (id < 0){
        return res.send({success:false, message: "Invalid id"});
    }

    const  productsById = await ProductManager.getProductById(id);

    if(!productsById ) { return res.send({success:false, message: "Product not found"}); }
    res.send({success:true, product: productsById});

   }catch(e){
    console.log(e)
    return res.send({success:false, message: e});
   }

})



// esto es para enviar data JSON con un post y tiene un metodo validador que en caso de no tener ningun user sale error
app.post('/api/products', async (req, res) =>{

   try{ 
    
    const {title, description, code, price,status, stock,category, thumbnails} = req.body
        if(!title || !description  || !code || !price || !status || !stock || !category || !thumbnails){
        return res.send({success: false,error:'valores incomplete'});
        }
    const savedProduct = await ProductManager.addProduct({title, description, code, price,status, stock,category, thumbnails});


    res.send({status:'success',message:'Product created'})
    return savedProduct;
    }
    catch(e){
        console.error(e);
        res.send({success: false,error:'Ocurrio un error en la carga del producto'});

    }
})


app.get('/api/carts', async (req, res) => {
    

})



const server = app.listen(PORT, () => {
    console.log(`>>>> Server started at http://localhost:${PORT}`)
})

server.on('error', (error) => console.log(error));