import {Router} from 'express'

const router = Router()
const users = []
router.get('/',(req,res) => {
    res.json({users});
    res.send('Router User');
})

router.get('/info',(req,res) => {   res.send('Info User' )   })

router.post('/',(req,res) => {  
 const user = req.body
 users.push(user)
 res.json({status: 'success'})
})



export default router
