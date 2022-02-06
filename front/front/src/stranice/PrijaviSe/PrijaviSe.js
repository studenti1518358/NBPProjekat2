import React,{useState,useContext} from 'react'
import './PrijaviSe.css'
import loginImg from "./slika.svg"
import {Link,Navigate} from 'react-router-dom'
export default function PrijaviSe() {
   

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
              <input type="text" name="username" className='unosPrijava' placeholder="Korisničko ime"   />
            </div>
           
            
            <div className="form-group">
              <label htmlFor="password">Šifra</label>
              <input type="password" name="password" className='unosPrijava' placeholder="Šifra"    />
    
            </div>
          </div>
        </div>
       
        <div className="form-group">
          <button type="button" className="btn" >
            Prijavi se
          </button>
          <label className='labela'>Nemate nalog? <Link to='/RegistrujSe' >
                    Registruj se
             </Link></label>
        </div>
      </div>
    )
}
