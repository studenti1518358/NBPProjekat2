import React,{useState} from 'react'
import './PrijaviSe.css'
import loginImg from "./slika.svg"
import {Link} from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Formular from './Formular.js'
export default function ReigstrujSe() {

  const [mail,setMail]=useState("")
  const [lozinka,setLozinka]=useState("")
  const [dalje,setDalje]=useState(false)

  const idiDalje=()=>{
    console.log("cao")
    setDalje(true)
  }
 
    return (
       <>
       {!dalje && (<div className="base-container" >
        <div className="header">Dobrodošli!</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login" />
            
          </div>
          <div className="form">
           
            <div className="form-group">
              <label htmlFor="username">Mail</label>
              <input type="text" name="username" className='unosPrijava' placeholder="Email" onChange={e=>setMail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Šifra</label>
              <input type="password" className='unosPrijava' name="password" placeholder="Šifra" onChange={e=>setLozinka(e.target.value)} />
    
            </div>
            
          </div>
        </div>
       
        <div className="form-group">
        <button type="button" className="btn plavoDugme" onClick={idiDalje} >
              
                Dalje
             
        
          </button>
          
          <label className='labela'>Imate nalog? <Link to='/prijaviSe' >
                    Prijavi se
             </Link></label>
        </div>
      </div>)}
      {dalje && <Formular mail={mail} lozinka={lozinka} setDalje={setDalje}/>}
      </>
    )
}
