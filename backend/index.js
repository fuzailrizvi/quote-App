const express=require('express');
const app=express();
require('dotenv').config();
const PORT=process.env.PORT||5000;
const authrouter=require('./routes/auth.routes');
const mongoose=require('mongoose');
const quoteRouter=require('./routes/quote.routes');
const userRouter=require('./routes/user.routes');
const cors=require('cors');
const Mongo_URL=process.env.Mongo_URL;

mongoose.connect(`${Mongo_URL}`,{dbName:'quoteApp'})
.then(()=>{
    console.log('DB Connected Successfully');
    
})
.catch((err)=>console.log(err));


// mongoose.connect('mongodb://127.0.0.1:27017/QuoteDB')
// .then(()=>{console.log('DB Connected');
// })
// .catch((err)=>console.log(err));


app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Backend Working Fine');
})
app.use("/api/v1/auth",authrouter);
app.use("/api/v1/quotes",quoteRouter);
app.use("/api/v1/users",userRouter);



app.listen(PORT,()=>{
    console.log('Server is running at',PORT);
    
})



