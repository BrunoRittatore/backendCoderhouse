import {Router} from 'express'

const router = Router()
router.get('/',(req,res) => {
    res.send('Router User');
})

router.get('/info',(req,res) => {   res.send('Info User' )   })

export default router
