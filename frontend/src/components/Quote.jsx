import React, { useState } from 'react'

const Quote = ({quote}) => {
  
    const [edit,setEdit]=useState(false);
    
    return (
    <div className='flex gap-2 border-b-2 mb-6 pb-6 dark:text-white'>
    <div className='border-2 w-10 h-10 rounded-full flex justify-center items-center shrink-0'>
    {`${quote.author.fullName.split(" ")[0][0]} ${quote.author.fullName.split(" ")[1][0]}`}
    </div>
    <div>
      <p className='font-merriweather'>“{quote.text}”</p>
      <p>- {quote.author.fullName}</p>
    </div>
    <span className='text-blue-500 cursor-pointer hover:underline'>
        {edit?"Cancel":"Edit"}
    </span>
  </div>

  
  )
}

export default Quote