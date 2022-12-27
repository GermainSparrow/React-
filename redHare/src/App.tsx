import React from 'react';
import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';

const Login = React.lazy(() => import('./pages/Login.js'));
const NavPage = React.lazy(() => import('./pages/NavPage'));
const User = React.lazy(() => import('./pages/SystemUser'));
const SystemCharacter = React.lazy(() => import('./pages/SystemCharacter'));
function App() {

  return (
    <>
      <React.Suspense fallback={<div>加载中...</div>}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="login" replace />} />
            <Route path="login" element={<Login />}></Route>
            <Route path="system" element={<NavPage />}>

              <Route path='user' element={<User />}></Route>
              <Route path='role' element={<SystemCharacter />}></Route>

            </Route>
          </Routes>
        </HashRouter>
      </React.Suspense>
      <Outlet />
    </>
  )
}

export default App
