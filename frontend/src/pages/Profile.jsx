import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = ({user}) => {
  
  const[userQuotes,setUserQuotes]=useState([]);
  
  async function getUserQuotes(){
    const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    )

    if(res.status==200){
      setUserQuotes(res.data.quotes);
    }

    
  }

  useEffect(()=>{
    getUserQuotes();
  },[])
  
  return (
    <div>
      
    </div>
  )
}

export default Profile