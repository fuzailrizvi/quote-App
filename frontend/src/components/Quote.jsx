import React, { useState } from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast';

const Quote = ({quote,updateQuote,deleteQuote}) => {
  
    const [edit,setEdit]=useState(false);
    const [edittedText,setEdittedText]=useState(quote.text);
    const {pathname}=useLocation();

    async function saveHandler(){
      try {
        const response= await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/quotes/${quote._id}`,
          {text:edittedText},
          {
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })
          
          if(response.status==200){
           
            updateQuote(response.data);
            toast.success('Quote updated successfully');
            setEdit(false);
          }
      } catch (error) {
        toast.error(error.response.data.message);
      }
        
      
    }

    async function deleteHandler(){
      try {
        const res=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/quotes/${quote._id}`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
  
        if(res.status==200){
          
          deleteQuote(res.data);
          toast.success('Quote Deleted Successfully');
        }
      } catch (error) {
        toast.error('Some Error occured in deleting');
      }
    }
    
    return (
    <div className='flex gap-2 border-b-2 mb-6 pb-6 dark:text-white'>
    <div className='border-2 w-10 h-10 rounded-full flex justify-center items-center shrink-0'>
    {`${quote.author.fullName.split(" ")[0][0]} ${quote.author.fullName.split(" ")[1][0]}`}
    </div>
    <div className='grow'>
      {
        edit?<textarea onChange={(e)=>{
            setEdittedText(e.target.value)
        }}value={edittedText} className={`${edit && "border-2"} w-full`}></textarea>:
      
      <p className='font-merriweather'>“{quote.text}”</p>
      }


       <p>- {quote.author.fullName}</p>
       {
       pathname==='/profile' &&
       <div className='flex gap-3 justify-end'>
        {
          edit? <span onClick={()=>{
            saveHandler();
          }} className='text-blue-500 cursor-pointer hover:underline'>Save</span>:
          <span onClick={()=>{
            deleteHandler();
          }} className='text-blue-500 cursor-pointer hover:underline'>Delete</span>
        }
       <span onClick={()=>{
      setEdit(prev=>!prev);
    }}className='text-blue-500 cursor-pointer hover:underline'>
        {edit?"Cancel":"Edit"}
    </span>
       
       </div>
      }
    </div>
    
    
    
  </div>

  
  )
}

export default Quote