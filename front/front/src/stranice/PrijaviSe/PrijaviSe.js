import React,{useState,useContext} from 'react'
import './PrijaviSe.css'
import loginImg from "./slika.svg"
import {Link,Navigate} from 'react-router-dom'
export default function PrijaviSe() {
   

    const [mail,setMail]=useState("")
    const [lozinka,setLozinka]=useState("")
    const [redirect,setRedirect]=useState(false)
    const prijaviSe=async()=>{
      if (!mail || !lozinka)
        {
          alert("Morate popuniti oba polja!")
          return
        }
        else{
          const response=await fetch('http://localhost:5000/Korisnik/logujKorisnika',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body: JSON.stringify({
              mail:mail,
              lozinka:lozinka,
             }
      
            )

          })
          if(response.status===200){
            const response1=await fetch('http://localhost:5000/Korisnik/getKorisnik',{
         
              headers:{'Content-Type':'application/json'},
              credentials:'include'
              
             
            })
            console.log(response1)
            const korisnik=await response1.json()
            console.log(korisnik)
            localStorage.setItem('status',korisnik.status)
            localStorage.setItem('prijavljen',true)
           // setRedirect(true)
            window.location.reload()

          }
          else{
            alert("Pogresno korisnicko ime ili lozinka!Pokusajte ponovo!")
          }
        }
    }
    if(localStorage.getItem('prijavljen'))
       return (<Navigate to='/Proizvodi'></Navigate>)
    return (

        <div className="base-container" >
        <div className="header">Dobrodošli!</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login" />
            
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">E-mail</label>
              <input type="text" name="username" className='unosPrijava' placeholder="Vas email" onChange={e=>setMail(e.target.value)}  />
            </div>
           
            
            <div className="form-group">
              <label htmlFor="password">Šifra</label>
              <input type="password" name="password" className='unosPrijava' placeholder="Šifra"  onChange={e=>setLozinka(e.target.value)}  />
    
            </div>
          </div>
        </div>
       
        <div className="form-group">
          <button type="button" className="btn plavoDugme" onClick={prijaviSe} >
            Prijavi se
          </button>
          <label className='labela'>Nemate nalog? <Link to='/RegistrujSe' >
                    Registruj se
             </Link></label>
        </div>
      </div>
    )
}
