import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import './Korisnik.css'

export default function Korisnik(){

    const [korisnik,setKorisnik]=useState({})
    const {mail}=useParams()
    useEffect(()=>{
        const preuzmi=async()=>{
            const response=await fetch('http://localhost:5000/Korisnik/getKorisnikByMail/'+mail)
            if(response.status===200){
                const korisnik1=await response.json()
                console.log(korisnik1)
                setKorisnik(korisnik1)
            }

        }
        preuzmi()

    },[mail])

    return(
        
        <div className='pozadina'>
        {korisnik && (<div className='licniPodaci'>
            <h3 className='podaciNaslov'>Licni podaci</h3>
            <div><b>Ime:</b>
            <div><u>{korisnik.ime}</u></div>
            </div>
            <div><b>Prezime:</b>
            <div><u>{korisnik.prezime}</u></div>
            </div>
            <div><b>Email:</b>
            <div><u>{korisnik.mail}</u></div>
            </div>
            <div><b>Broj telefona:</b>
            <div><u>{korisnik.brojTelefona}</u></div>
            </div>
            {korisnik.adresa && (<div className='adresa'>
            <h5>Adresa</h5>
            <div><b>Ulica:</b>
            <div><u>{korisnik.adresa.ulica}</u></div>
            </div>
            <div><b>Broj:</b>
            <div><u>{korisnik.adresa.broj}</u></div>
            </div>
            <div><b>Mesto:</b>
            <div><u>{korisnik.adresa.mesto}</u></div>
            </div>
            <div><b>Postanski broj:</b>
            <div><u>{korisnik.adresa.postanskiBroj}</u></div>
            </div>
           
           </div>)}
                     
            
        </div>)}
        </div>
        
    )
}