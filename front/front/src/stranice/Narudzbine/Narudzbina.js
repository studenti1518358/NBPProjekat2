import {Button} from 'react-bootstrap'
import './Narudzbine.css'
import { useNavigate} from "react-router-dom"
export default function Narudzbina({narudzbina}){
    const navigate=useNavigate()
    const prikazi=()=>{
        navigate("/Korisnik/"+narudzbina.emailKupca)

    }
    const oznaci=async()=>{
        const response=await fetch('http://localhost:5000/Narudzbine/oznaciPorudzbinuKaoPlacenu/'+narudzbina.id,{
            method:"POST",
            headers:{'Content-Type':'application/json'}})
        if(response.status===200){
            window.location.reload()
        }
    }

    return(

        <tr>
            <td>{narudzbina.nazivProizvoda}</td>
            <td>{narudzbina.cenaProizvoda}</td>
            <td>{narudzbina.velicinaProizvoda}</td>
            <td>{narudzbina.placena?'Placena':(<Button onClick={oznaci}>Oznaci kao placenu</Button>)}</td>
            <td>{new Date(narudzbina.datumPorudzbine).toDateString()}</td>
            <td>{narudzbina.datumPlacanja?new Date(narudzbina.datumPlacanja).toDateString():'/'}</td>
            <td>{narudzbina.emailKupca} <div className='kupacLink' onClick={prikazi}>vidi informacije</div></td>
          
          
        </tr>

    )

}