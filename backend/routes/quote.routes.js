const router=require('express').Router();
const {isAuthenticated}=require('../middleware/isAuthenticated');


router.get('/',isAuthenticated,(req,res)=>{
    res.send('Connected');
})

module.exports=router;