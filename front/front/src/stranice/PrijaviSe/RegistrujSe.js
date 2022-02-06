import React,{useState} from 'react'
import './PrijaviSe.css'
import loginImg from "./slika.svg"
import {Link} from 'react-router-dom'
import { NavLink } from 'react-router-dom'
export default function ReigstrujSe() {
 
    return (

        <div className="base-container" >
        <div className="header">Dobrodošli!</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login" />
            
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Korisničko ime</label>
              <input type="text" name="username" className='unosPrijava' placeholder="Korisničko ime"  />
            </div>
            <div className="form-group">
              <label htmlFor="username">Mail</label>
              <input type="text" name="username" className='unosPrijava' placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Šifra</label>
              <input type="password" className='unosPrijava' name="password" placeholder="Šifra"  />
    
            </div>
            
          </div>
        </div>
       
        <div className="form-group">
        <button type="button" className="btn" >
               <NavLink className="nav-link" to="/Formular" >
                Dalje
              </NavLink>
        
          </button>
          
          <label className='labela'>Imate nalog? <Link to='/prijaviSe' >
                    Prijavi se
             </Link></label>
        </div>
      </div>
    )
}
