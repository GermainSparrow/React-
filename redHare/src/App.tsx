import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route, Navigate,HashRouter } from 'react-router-dom';

const Login = React.lazy(()=>import('./pages/Login.js'));

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="login"
            replace />} />
          <Route path="login" element ={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
