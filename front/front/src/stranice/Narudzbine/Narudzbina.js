import {Button} from 'react-bootstrap'
import './Narudzbine.css'
import { useNavigate} from "react-router-dom"
export default function Narudzbina({narudzbina}){
    const navigate=useNavigate()
    const prikazi=()=>{
        navigate("/Korisnik/"+narudzbina.emailKupca)

    }

    return(

        <tr>
            <td>{narudzbina.nazivProizvoda}</td>
            <td>{narudzbina.cenaProizvoda}</td>
            <td>{narudzbina.velicinaProizvoda}</td>
            <td>{narudzbina.placena?'Placena':(<Button>Oznaci kao placenu</Button>)}</td>
            <td>{new Date(narudzbina.datumPorudzbine).toDateString()}</td>
            <td>{narudzbina.datumPlacanja?new Date(narudzbina.datumPlacanja).toDateString():'/'}</td>
            <td>{narudzbina.emailKupca} <div className='kupacLink' onClick={prikazi}>vidi informacije</div></td>
          
          
        </tr>

    )

}