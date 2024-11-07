const router=require('express').Router();
const {isAuthenticated}=require('../middleware/isAuthenticated');
const quoteController=require('../controllers/quoteController');


router.post('/',isAuthenticated,quoteController.createQuote);
router.get('/',isAuthenticated,quoteController.getQuotes);
router.get('/:id',isAuthenticated,quoteController.getQuoteById);
router.patch('/:id',isAuthenticated,quoteController.updateQuote);
router.delete('/:id',isAuthenticated,quoteController.deleteQuote);

module.exports=router;