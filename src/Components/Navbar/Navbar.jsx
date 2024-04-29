import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid ">


          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
              
              </li>
              <li className="nav-item">
                <NavLink to='عام' className="nav-link">
                عام
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="السيارات" className="nav-link" >
                السيارات
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="صناعةوتجارة" className="nav-link" >
                صناعة و تجارة
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="عقارات" className="nav-link" >
                عقارات
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="مالتي ميديا" className="nav-link" >
                مالتي ميديا
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="خدمات" className="nav-link" >
                خدمات
                </NavLink>
              </li>
             


            </ul>

          </div>
          <Link to='/createArticle'> <i className="fa-solid fa-circle-plus italic px-2 py-1 fs-3"></i></Link>
          
        </div>
      </nav>

     
    </div>

  )
}
