import React, { useState } from 'react'
import {useLocation} from 'react-router-dom'
const Quote = ({quote}) => {
  
    const [edit,setEdit]=useState(false);
    const [edittedText,setEdittedText]=useState(quote.text);
    const {pathname}=useLocation();

    async function saveHandler(){
      console.log('save Handler');
      
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