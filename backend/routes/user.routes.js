const router=require('express').Router();
const {isAuthenticated}=require('../middleware/isAuthenticated');
const UserModel=require('../models/User.model');
const QuoteModel=require('../models/Quote.model');

router.get('/me',isAuthenticated,async (req,res)=>{
    try {
        const userId=req.user.id;
    const user=await UserModel.findById(userId).select('-password');
    const quotes=await QuoteModel.find({author:userId});
    res.status(200).json({
        user,
        quotes
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something Went Wrong'
        })
    }
    
})

module.exports=router;