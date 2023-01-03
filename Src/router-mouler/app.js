import  express  from 'express';

import usersRouter from "../router-mouler/routes/users.router.js";

const app = express();
app.use('/api/users', usersRouter);

app.use('/',(req,res)=> res.send('HOME'))


app.listen(8080);
