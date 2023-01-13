import  express  from 'express';

const app = express();


//Middleware for error handling
app.use(function(err,req, res, next) { 
    console.error(err.stack);
    res.status(500).send('Something went wrong')

})


// Middleware de application
app.use(function(req, res, next) {
    console.log('Time' , new Date().toLocaleTimeString());
    next();
})

//Middleware of endpoint
// Aca establezco un endpoint para el path info que lo tengo que poner antes de los req/res
function mid1 (req, res, next) {
    req.dato1 = 'My data , not your data'
    next();
}
// Aqui aplico el middleware para el endpoint
app.use('/info',mid1,(req,res) => {
    console.log(req.dato1);
    res.send('More information')

})


app.use('/',(req,res) => {

    res.send('Ok')

})
app.listen(8080)