
import {Modal,Button} from 'react-bootstrap'
import {useState,useEffect} from 'react'
export default function NaruciModal({setModal,modal,proizvod,mejl}){
    const [velicina,setVelicina]=useState()
    useEffect(()=>{
        if(proizvod){
            if(proizvod.velicine && proizvod.velicine[0]){
                setVelicina(proizvod.velicine[0].naziv)
            }
        }

    },[proizvod])
    const naruci=async()=>{
        console.log(mejl)
        console.log(proizvod.naziv)
        console.log(velicina)
        const response=await fetch('http://localhost:5000/Narudzbine/naruciProizvod',{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {
                    nazivProizvoda: proizvod.naziv,
                   velicinaProizvoda: velicina,
                     mailKupca: mejl
                  }
            )
          })
       if(response.status===200)
          alert('Uspesno ste porucili ovaj proizvod')
    else alert('Zao nam je, ali ne mozete da porucite ovaj proizvod')
    setModal(false)
    window.location.reload()
    }
    return(
        <Modal show={modal} className='modaal'>
              
              <Modal.Body className='modaal'>
           {proizvod && <label className='labModal'>Proizvod: <b>{proizvod.naziv}</b></label>}
             
              <label className='labModal'>Veličina: 
                  <select className='inputModal' onChange={e=>setVelicina(e.target.value)}>
                     {proizvod && proizvod.velicine &&proizvod.velicine.map(velicina=>{
                         return (<option>{velicina.naziv}</option>)
                     }
                         

                     )

                     }
                  </select></label>
             </Modal.Body>
              <Modal.Footer >
                  <Button onClick={naruci}>Potvrdi</Button>
                  <Button onClick={()=>setModal(false)}>Poništi</Button>
              </Modal.Footer>
       </Modal>
    )
}