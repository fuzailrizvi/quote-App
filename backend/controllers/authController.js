const bcrypt = require("bcrypt");
const UserModel = require("../models/User.model");
const { createToken } = require("../utils/createToken");

const register = async (req, res) => {
 
  try {
    
    const { email, password, fullName } = req.body;
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }
    

    const hashedPassword = await bcrypt.hash(password, 10);
    

    const user = await UserModel.create({
      email,
      fullName,
      password: hashedPassword,
    });
    const token = createToken({
      id: user._id,
    });
   

    res.status(201).json({
      success: true,
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

const login=async (req,res)=>{
  try {
    const{email,password}=req.body;

  const user=await UserModel.findOne({email});

  if(user){
    const isValid=await bcrypt.compare(password,user.password);

    if(!isValid){
      return res.status(400).json({
        success:false,
        message:'Invalid credentials'
      })
    }

   return res.status(202).json({
      success:true,
      id:user._id,
      email:user.email,
      fullName:user.fullName,
      token:createToken({id:user._id})
    })
  }

  res.status(400).json({
    success:false,
    message:'Invalid Credentials'
  })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:'Something went wrong'
    })
    
  }

}

module.exports = {
  register,
  login
};
