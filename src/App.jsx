import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './AuthenticationPage/Login'
import Signup from './AuthenticationPage/Signup'
import Home from './Pages/HOme'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App