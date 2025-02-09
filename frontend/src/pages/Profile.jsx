import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Quote from '../components/Quote';
import toast from 'react-hot-toast';


const Profile = ({user}) => {
  
  const[userQuotes,setUserQuotes]=useState([]);
  
  async function getUserQuotes(){
    try {
      const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      )
     
      
      if(res.status==200){
        setUserQuotes(res.data.quotes);
      }
    } catch (error) {
      
      toast.error(error.response.data.message)
    }

    
  }

  function updateQuote(quoteData){
    const newQuotes = userQuotes.map(quote => 
                                  quote._id === quoteData._id ? {...quoteData}: quote)
    setUserQuotes(newQuotes);
  }

  useEffect(()=>{
    getUserQuotes();
  },[])
  
  return (
    <div>
      {userQuotes.map(quote=> <Quote key={quote._id} quote={quote} updateQuote={updateQuote}/>)}
    </div>
  )
}

export default Profile