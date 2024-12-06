import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import  axios  from "axios";
const Login = ({handleLogin}) => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  
  async function submitHandler(){
   try {
    const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,{
      email,password
     });
  
    //  console.log(res);
  
     if(res.status==202){
      const{email,fullName,id,token}=res.data;
      handleLogin(id,email,fullName,token);
     }
   } catch (error) {
      // console.log(error);
      alert(error.response.data.message);
      
   }
   
    
  }
  
  return (
    <div>
      

<form onSubmit={(e)=>{
  e.preventDefault();
  submitHandler();
}} class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
    <input onChange={(e)=>{
      setEmail(e.target.value);
    }}
     type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
    <input onChange={(e)=>{
      setPassword(e.target.value);
    }} type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

  <div className='mt-3'>Haven't Registered Yet? <Link className='text-blue-500 hover:underline' to={'/register'}>Register</Link></div>
</form>

    </div>
  )
}

export default Login