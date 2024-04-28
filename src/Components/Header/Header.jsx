import React from 'react'
import logo from '../../Assets/Images/logo.png'

export default function Header() {
  return (
    <div className=' bg-white header-brdr'>
   <div className="container-fulid mx-5 px-5">
     <div className=' d-flex'>
      <div className='logo'>
        <img src={logo} alt="logo" className='w-100 h-100 object-fit-cover' />
      </div>
      <div>
        <p className=' mt-3 mb-2'>رئيس التحرير </p>
        <p className=' mt-0'>عصام كامل </p>
      </div>
    </div>
   </div>
   </div>
  )
}
