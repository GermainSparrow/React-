import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';

const Login = React.lazy(() => import('./pages/Login.js'));
const NavPage = React.lazy(() => import('./pages/NavPage'))
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="login"
            replace />} />
          <Route path="login" element={<Login />}></Route>
          <Route path="navPage" element={<NavPage />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
