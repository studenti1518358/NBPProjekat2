import {Modal,Button,Table} from 'react-bootstrap'
import {useState,useEffect} from 'react'

export default function Korpa({modalPorudzbina,setModalPorudzbina,mejl}){
    const [narudzbine,setNarudzbine]=useState([])
    const [ukupno,setUkupno]=useState(0)

    useEffect(()=>{

        const preuzmi=async()=>{
            const response=await fetch('http://localhost:5000/Narudzbine/vidiKorpu/'+mejl)
            if(response.status===200){
                const niz=await response.json()
                setNarudzbine(niz)
                let suma=0
               for(let i=0;i<niz.length;i++)
                if(!niz[i].placena)
                   suma=suma+niz[i].cenaProizvoda
                setUkupno(suma)
            }
        }
        preuzmi()

    },[mejl])

    const otkaziPorudzbinu=async(id)=>{
        if(window.confirm('Da li ste sigurni da zelite da otkazete porudzbinu?')){
            console.log(id)

            const response=await fetch('http://localhost:5000/Narudzbine/otkaziPorudzbinu/'+id,{
                method:"DELETE",
                headers:{'Content-Type':'application/json'}
                
              })
            if(response.status===200){
                alert('Narudzbina otkazana')
                setNarudzbine(prev=>prev.filter(nar=>nar.id!==id))
            }
            else alert('Ne mozete otkazati')
            console.log(response)
          

        }
    }
    
    return(
        <Modal show={modalPorudzbina} size='lg'>
        <Modal.Body className='modNar'>
       
            <h2 className='korpa'><i class="bi bi-cart"/>Vasa korpa</h2>
            <div className='korpaLab'>Ukupno dugujete: <b>{ukupno}</b></div>
            <label>Vase porudzbine:</label>
            <Table responsive striped bordered hover className='tablaNar' caption='Vase porudzbine'>
            <thead>
               <tr>
               <th>Naziv proizvoda</th>
               <th>Cena proizvoda</th>
               <th>Velicina proizvoda</th>
               <th>Status narudzbine</th>
               <th>Datum narucivanja</th>
               <th>Datum placanja</th>
              
               </tr>
           </thead>
        <tbody>
            {narudzbine.map(narudzbina=>{
                return(

                    <tr>
                    <td>{narudzbina.nazivProizvoda}</td>
                    <td>{narudzbina.cenaProizvoda}</td>
                    <td>{narudzbina.velicinaProizvoda}</td>
                    <td>{narudzbina.placena?'Placena':'Nije placena'}{!narudzbina.placena && (<Button onClick={()=>otkaziPorudzbinu(narudzbina.id)} variant='danger'>Otkazi</Button>)}</td>
                    <td>{new Date((narudzbina.datumPorudzbine)).toDateString()}</td>
                    <td>{narudzbina.datumPlacanja?new Date(narudzbina.datumPlacanja).toDateString():'/'}</td>
                  
                   
                  
                  
                </tr>
        

                )
            })}
            </tbody>
            </Table>
           
        </Modal.Body>
        <Modal.Footer >
            <Button >Potvrdi</Button>
            <Button onClick={()=>setModalPorudzbina(false)}>Ok</Button>
        </Modal.Footer>
     </Modal>
    )
}