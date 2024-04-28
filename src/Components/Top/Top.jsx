import React from 'react'

export default function Top() {
    const currentDate = new Date();
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      localeMatcher: 'best fit',
    };
    const currentDateTime = currentDate.toLocaleDateString('ar-EG', options);
  return (
    <div>
      
        <div className='d-flex justify-content-around py-2'>
            <div>{currentDateTime}</div>
            <div className='main-bg text-white  px-md-3 py-md-2 rounded-pill  text-center'>
              <i className="fa-regular fa-newspaper"></i><span className='pe-sm-1'> الجريدة الورقية</span>
              </div>
            <div className='d-flex'>
              <div className='icon mx-1'>  <a href='https://web.facebook.com/' target='_blank' className='text-white'><i className="fa-brands fa-facebook-f "></i></a></div>
               <div className='icon mx-1'><a href='https://www.youtube.com' target='_blank' className='text-white'><i className="fa-brands fa-youtube "></i></a> </div> 
              <div className='icon mx-1'>  <a href='https://twitter.com' target='_blank' className='text-white'><i className="fa-brands fa-x-twitter "></i></a> </div>
               <div className='icon mx-1'><a href='https://www.instagram.com/' target='_blank' className='text-white'><i className="fa-brands fa-instagram fw-bolder "></i></a></div> 
               
            </div>
        </div>
    </div>
  )
}
