import React , {useEffect,useState} from 'react'
import './Navbar.css'
import { NavLink,Link  } from 'react-router-dom'
import $ from 'jquery'
import  Dropdown  from './Dropdown.js'


const Navbar = () => {
  
  const [dropdown, setDropdown] = useState(false);
  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent')
    var activeItemNewAnim = tabsNewAnim.find('.active')
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight()
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth()
   var itemPosNewAnimTop = activeItemNewAnim.position()
    var itemPosNewAnimLeft = activeItemNewAnim.position()
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    })
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active")
      $(this).addClass('active')
      var activeWidthNewAnimHeight = $(this).innerHeight()
      var activeWidthNewAnimWidth = $(this).innerWidth()
      var itemPosNewAnimTop = $(this).position()
      var itemPosNewAnimLeft = $(this).position()
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      })
    })
  }
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  }

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  }

  useEffect(() => {
    
    animation()
    $(window).on('resize', function(){
      setTimeout(function(){ animation()}, 500)
    })
    
  }, [])
  
  return (
  <nav className="navbar navbar-expand-lg navbar-mainbg">
    
      <NavLink className="navbar-brand navbar-logo logo" to="/" >
        Boutique
      </NavLink>
      <button 
        className="navbar-toggler"
        onClick={ function(){
          setTimeout(function(){ animation()})
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
    
      
      <div 
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" >
               Početna
              </NavLink>
            </li>

            <li className="nav-item active">
              <NavLink className="nav-link" to="/Proizvodi" >
               Naša ponuda
              </NavLink>
            </li>


            <li className="nav-item active">
              <NavLink className="nav-link" to="/PrijaviSe" >
               Prijavi se
              </NavLink>
            </li>

            <li className="nav-item active">
              <NavLink className="nav-link" to="/RegistrujSe" >
              Registruj se
              </NavLink>
            </li>

           

           
        </ul>
        
      
      </div>
  </nav>
  )
} 
export default Navbar