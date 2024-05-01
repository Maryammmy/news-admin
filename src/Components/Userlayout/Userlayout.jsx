import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import Top from '../Top/Top'
import Contact from '../Contact/Contact'
import Footer from '../Footer/Footer'

export default function Userlayout() {
  return (
    <>
      <Top />
      <Header />
      <Navbar />
      <div className='min-h'><Outlet /></div>
      <Contact />
      <Footer />

    </>
  )
}
