import React from 'react'
import logo from '../../Assets/Images/logo.png'

export default function Contact() {
  return (
    <div className='contact-bg pt-3 '>
      <div className='contact-brdr'>
      <div className="container-fulid mx-5 px-5">
        <div className='d-flex justify-content-between'>
          <div className='logo'>
            <img src={logo} alt="logo" className='w-100 h-100 object-fit-cover' />
          </div>
        
          <div className='d-flex mt-4'>
            <div className='icon-white mx-2'>  <a href='https://web.facebook.com/' target='_blank' className='color'><i className="fa-brands fa-facebook-f "></i></a></div>
            <div className='icon-white mx-2'><a href='https://www.youtube.com' target='_blank' className='color'><i className="fa-brands fa-youtube "></i></a> </div>
            <div className='icon-white mx-2'>  <a href='https://twitter.com' target='_blank' className='color'><i className="fa-brands fa-x-twitter "></i></a> </div>
            <div className='icon-white mx-2'><a href='https://www.instagram.com/' target='_blank' className='color'><i className="fa-brands fa-instagram fw-bolder "></i></a></div>

        
        </div>
        </div>


      </div>
      </div>
     
      <div className="container">
      <div className='row justify-content-center align-items-center py-3 text-center'>
        <div className='col-md-1'><a href="عام" className=' text-decoration-none text-black fw-bolder'>عام</a></div>
        <div  className='col-md-1'><a href="السيارات" className=' text-decoration-none text-black fw-bolder'>السيارات</a></div>
        <div  className='col-md-1 p-lg-1 me-md-4 me-lg-0'><a href="صناعة و تجارة" className=' text-decoration-none text-black fw-bolder'>صناعة و تجارة</a></div>
        <div  className='col-md-1'><a href="عقارات" className=' text-decoration-none text-black fw-bolder'>عقارات</a></div>
        <div  className='col-md-1 p-lg-1 me-md-2 me-lg-0'><a href="مالتي ميديا" className=' text-decoration-none text-black fw-bolder'>مالتي ميديا</a></div>
        <div  className='col-md-1'><a href="خدمات" className=' text-decoration-none text-black fw-bolder'>خدمات</a></div>

      
       

        
      </div>
    </div>
    </div>
  
  )
}
