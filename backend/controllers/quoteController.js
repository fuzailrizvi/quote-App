const QuoteModel=require('../models/Quote.model');


const getQuotes=async (req,res)=>{
    try {
        const quotes=await QuoteModel.find();
        res.status(200).json(quotes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
        
        
    }
}

const getQuotesById= async (req,res)=>{
   try {
    const id=req.body.id;

    const quote=await QuoteModel.findById(id);
    res.status(200).json(quote);
   } catch (error) {
    console.log(error);
    res.status(500).json({
        success:false,
        message:'Something Went Wrong'
    })
    
   }

};

const createQuote= async (req,res)=>{

};