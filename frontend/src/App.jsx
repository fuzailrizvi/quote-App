import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  const [isAuthenticated,setIsAuthenticated]=useState("");
  const navigate=useNavigate();
  const user=localStorage.getItem('user');

  useEffect(()=>{
    setIsAuthenticated(localStorage.getItem('token'))
  },[isAuthenticated])

  function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  }
  
  function handleLogin(id,email,fullName,token){
      localStorage.setItem('token',token);
      localStorage.setItem('user',JSON.stringify({id,email,fullName}));
      setIsAuthenticated(true);
      
      navigate("/");
      
  }
  
  
  return (
    <div className='max-h-screen min-h-screen dark:bg-slate-800'>
      
      <Navbar isAuthenticated={isAuthenticated} logout={logout}/>
      <div className='dark:bg-slate-800 max-w-[600px] mx-auto'>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login'} element={<Login isAuthenticated={isAuthenticated} handleLogin={handleLogin}/>}/>
        <Route path={'/register'} element={<Register/>}/>
      </Routes>
      </div>
      
     
      
    </div>
  )
}

export default App