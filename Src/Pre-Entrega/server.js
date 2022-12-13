const ProductManager = require("./ProductManager");
const express = require('express');
const app = express();
const products = []
const PORT = 8080;
const productManager = new ProductManager("products.json");
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/', (req, res) => {
    res.send('Hi Express Server!')
});


/*  SELECT   */

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

/*  SELECT   */

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


/*  UPDATE   */
app.put('/api/products:id', async (req, res) =>{

   try{ 
        const { id: paramId} = req.params;
        const id = Number(paramId);
        if(Number.isNaN(id) || id < 0 ){
            return res.send({
                success: false,error: 'El id debe ser valido'
            });
        }
        
     const {title, description, code, price,status, stock,category, thumbnails} = req.body
     await ProductManager.updateProduct(id,{title, description, code, price,status, stock,category, thumbnails});

    }
    catch(e){
        console.error(e);
        res.send({success: false,error:'Ocurrio un error en update del producto'});

    }
})


/* CREATION */
app.post('/api/products', async (req, res) =>{

    try{ 
     
     const {title, description, code, price,status, stock,category, thumbnails} = req.body
         if(!title || !description  || !code || !price || !status || !stock || !category || !thumbnails){
         return res.send({success: false,error:'valores incompletos'});
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
 
 app.delete('/api/products:id',async (req, res) => {
    try{ 
        const { id: paramId} = req.params;
        const id = Number(paramId);
        if(Number.isNaN(id) || id < 0 ){
            return res.send({
                success: false,error: 'El id debe ser valido'
            });
        }
        
     const deletedProduct =  await ProductManager.deleteProduct(id);
        res.send({succes:true , deleted :deletedProduct});
    }
    catch(e){
        console.error(e);
        res.send({success: false,error:'Ocurrio un error en el delete del producto'});

    }

})


app.get('/api/carts/:cid', async (req, res) => {
    
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


/* CREATION */
app.post('/api/carts/:cid/product/:pid', async (req, res) =>{

    try{ 
     
     const {title, description, code, price,status, stock,category, thumbnails} = req.body
         if(!title || !description  || !code || !price || !status || !stock || !category || !thumbnails){
         return res.send({success: false,error:'valores incompletos'});
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



const server = app.listen(PORT, () => {
    console.log(`>>>> Server started at http://localhost:${PORT}`)
})

server.on('error', (error) => console.log(error));