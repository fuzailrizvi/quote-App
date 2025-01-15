const User = require("./models/User.model");
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const Quote = require("./models/Quote.model");

mongoose.connect('mongodb://127.0.0.1:27017/QuoteDB')
.then(()=>console.log('DB Connected Successfully'))
.catch((err)=>console.log(err));

const randomQuotesGenerator=()=>{
    const randomQuotes=[
        "The best way to predict the future is to create it.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "It does not matter how slowly you go as long as you do not stop.",
        "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        "It always seems impossible until it's done.",
        "You are never too old to set another goal or to dream a new dream.",
        "Don't watch the clock; do what it does. Keep going.",
        "Success is not in what you have, but who you are.",
        "The only way to do great work is to love what you do.",
    ];

    return randomQuotes[Math.floor(Math.random()*randomQuotes.length)];
    
}


const seedDB=async ()=>{
    try {
        await User.deleteMany({});
    await Quote.deleteMany({}); 
    const users=[];
    for(let i=1;i<6;i++){
        const hashedPassword=await bcrypt.hash("1234",10);
        const user=await User.create({
            email:`user${i}@example.com`,
            password:hashedPassword,
            fullName:`user ${i}`
        })

        users.push(user);
    }

    for(let user of users){
        for(let i=1;i<4;i++){
            await Quote.create({
                text:randomQuotesGenerator(),
                author:user._id,
            })
        }
    }

    mongoose.connection.close();
    } catch (error) {
        console.log('Error in seeding DB',error);
        mongoose.connection.close();
        
    }
    
    
}

seedDB();
