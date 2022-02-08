import React,{useState,useEffect} from 'react'
import './Formular.css'
import { Navigate } from 'react-router-dom'

export default function FormPrva({mail,lozinka,setDalje}) {
    
    const [ime,setIme]=useState("")
    const [prezime,setPrezime]=useState("")
    const [ulica,setUlica]=useState("")
    const [broj,setBroj]=useState(0)
    const [mesto,setMesto]=useState("")
    const [postanski,setPostanski]=useState("")
    const [brTel,setBrTel]=useState("")
    const [status,setStatus]=useState("Kupac")
    const [uspesno,setUspesno]=useState(false)
    
   const registrujSe=async ()=>{
     const korisnik={
       mail:mail,
       ime:ime,
       prezime:prezime,
       lozinka:lozinka,
       status:status,
       brojTelefona:brTel,
       adresa:{
         ulica:ulica,
         broj:broj,
         mesto:mesto,
         postanskiBroj:postanski

       }
     }
     const response=await fetch('http://localhost:5000/Korisnik/registracija',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(korisnik)})

     if(response.status===200){
        alert("Uspesna registracija! Stranica ce se osveziti i moci cete da se prijavite")
        setUspesno(true)
      }
      else{ alert("Neuspesna registracija. Pokusajte ponovo.")
      setDalje(false)
    }
      //console.log(response)

   }
     if(uspesno)
         return(<Navigate to="/prijaviSe"></Navigate>)
  
    return (
        <div className='Formular'>
          <div className="nazad">
          <label className="nazadLabel" onClick={()=>setDalje(false)}> {"<<Nazad"}</label>
          </div>
             <label className='lblFormular'>*Unesite dodatne informacije o sebi - <label className='lblFormularInfo'>popuna ovih polja je obavezna :</label> </label>
            <div className='divFormularPrva'>
              
            <div className="form-group">
              <label htmlFor="username">Ime:</label>
              <input type="text" name="username" className='inputFormular' placeholder="Ime:"   onChange={e=>setIme(e.target.value)} />    
            </div>
            <div className="form-group">
              <label htmlFor="username">Prezime:</label>
              <input type="text" name="username" className='inputFormular'  placeholder="Prezime:" onChange={e=>setPrezime(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="username">Ulica:</label>
              <input type="text" name="username" className='inputFormular'  placeholder="Ulica:" onChange={e=>setUlica(e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="username">Broj:</label>
              <input type="number" name="username" className='inputFormular'  placeholder="Broj:"  onChange={e=>setBroj(e.target.value)}/>
            </div>
            
            <div className="form-group">
              <label htmlFor="username">Mesto stanovanja:</label>
              <input type="text" name="username" className='inputFormular'  placeholder="Mesto stanovanja:"  onChange={e=>setMesto(e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="username">Postanski broj:</label>
              <input type="text" name="username" className='inputFormular'  placeholder="Postanski broj" onChange={e=>setPostanski(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="username">Broj telefona:</label>
              <input type="number" name="username" className='inputFormular'  placeholder="Broj telefona:" onChange={e=>setBrTel(e.target.value)}/>
            </div>

           
            
            
            <div className="form-group">
              <label htmlFor="username">Registruj se kao:</label>
              <select  className='inputFormular' onChange={e=>setStatus(e.target.value)}>
                <option value='1'>Kupac</option>
                <option value='2'>Prodavac</option>
                </select>

            </div>
            

            <button onClick={registrujSe}
                className='btnPocetna plavoDugme'
                 >
                Potvrdi
                </button>


            </div>
        </div>
    )
}
