import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'


const Homepage = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default Homepage