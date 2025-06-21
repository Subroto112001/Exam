import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './AuthenticationPage/Login'
import Signup from './AuthenticationPage/Signup'
import Home from './Pages/Home'
import Pgaerout from './Pages/PageRouter/Pgaerout'
import Profile from "./Pages/Profile"
import Blog from './Pages/Blog'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Pgaerout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profle" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App