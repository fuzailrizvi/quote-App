import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  
  function handleLogin(id,email,fullName,token){
      localStorage.setItem('token',token);
      localStorage.setItem('user',JSON.stringify({id,email,fullName}));
      
  }
  
  
  return (
    <div>
      
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login'} element={<Login handleLogin={handleLogin}/>}/>
        <Route path={'/register'} element={<Register/>}/>
      </Routes>
     
      
    </div>
  )
}

export default App