import {Router} from 'express'

const router = Router()
const pets = []
router.get('/',(req,res) => {
    res.json({pets});
    
})

router.get('/info',(req,res) => {   res.send('Info PerformanceEventTiming' )   })

router.post('/',(req,res) => {  
 const pet = req.body
 pets.push(pet)
 res.json({status: 'success'})
})



export default router
