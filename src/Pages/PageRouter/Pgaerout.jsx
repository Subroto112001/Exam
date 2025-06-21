import React from 'react'
import Navbar from '../CommonPage/Navbar'
import { Outlet } from 'react-router'

const Pgaerout = () => {
  return (
    <div>
      <div className='flex justify-center items-center'>
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
}

export default Pgaerout