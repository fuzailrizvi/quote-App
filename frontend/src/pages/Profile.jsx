import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Quote from '../components/Quote';


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
      alert(error.response.data.message);
    }

    
  }

  useEffect(()=>{
    getUserQuotes();
  },[])
  
  return (
    <div>
      {userQuotes.map(quote=> <Quote key={quote._id} quote={quote}/>)}
    </div>
  )
}

export default Profile