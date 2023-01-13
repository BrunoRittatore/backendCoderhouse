import  express  from 'express';

import usersRouter from "../router-mouler/routes/users.router.js";
import petsRouter from "../router-mouler/routes/pets.router.js"; 
const app = express();
app.use(express.json()) // con esta linea reconoce el archivo .json
app.use(express.urlencoded({ extended: true })) // con esta linea reconoce el archivo.urlencoded    
app.use('/static/', express.static('public'))
app.use(express.static('public')) // public 
app.use('/api/users', usersRouter);
app.use('/api/pets',petsRouter);
app.use('/',(req,res)=> res.send('HOME'))


app.listen(8080);
