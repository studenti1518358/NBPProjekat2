import {Button} from 'react-bootstrap'
import './Narudzbine.css'
export default function Narudzbina({narudzbina}){

    return(

        <tr>
            <td>{narudzbina.nazivProizvoda}</td>
            <td>{narudzbina.cenaProizvoda}</td>
            <td>{narudzbina.velicinaProizvoda}</td>
            <td>{narudzbina.placena?'Placena':(<Button>Oznaci kao placenu</Button>)}</td>
            <td>{new Date(narudzbina.datumPorudzbine).toDateString()}</td>
            <td>{narudzbina.datumPlacanja?new Date(narudzbina.datumPlacanja).toDateString():'/'}</td>
            <td>{narudzbina.emailKupca} <div className='kupacLink'>vidi informacije</div></td>
          
          
        </tr>

    )

}