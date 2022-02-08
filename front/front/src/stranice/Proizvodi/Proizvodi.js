import React ,{useState,useMemo}from 'react'
import './Proizvodi.css'
import {FaStar} from 'react-icons/fa'
import {Table,Button,Modal,Alert,Row} from 'react-bootstrap'
import PaginationComponent from '../../komponente/PaginationComponent'
export default function Proizvodi() {
    const [ocena,setOcena]=useState(null)
    const [ukupnoStavki,setUkupnoStavki]=useState(0)
    const [trStranica,setTrStranica]=useState(1)
    const [proizvodi,setProizvodi]=useState([])
    const [modal,setModal]=useState(false)
    const [modalIzmeni,setModalIzmeni]=useState(false)
    const [modalDodaj,setModalDodaj]=useState(false)
    const [modalPorudzbina,setModalPorudzbina]=useState(false)
    const [nazivIzmena,setNazivIzmena]=useState("")
    const [tipIzmena,setTipIzmena]=useState("")
    const [cenaIzmena,setCenaIzmena]=useState("")
    const [slikaIzmenaIme,setSlikaIzmenaIme]=useState("")
    const [slikaIzmenaSrc,setSlikaIzmenaSrc]=useState("")
    const [slikaIzmenaFile,setSlikaIzmenaFile]=useState(null)
    const [slikaIme,setSlikaIme]=useState("")
    const [slikaSrc,setSlikaSrc]=useState("")
    const [slikaFile,setSlikaFile]=useState(null)
    const [velicinaIzmena,setVelicinaIzmena]=useState("")
    const [kolicinaIzmena,setKolicinaIzmena]=useState("")
    const STAVKE_PO_STRANICI=5

    
    const niz=[
        {
            id:'1',
            ime:"Dress Lucia",
            tip:"Haljina",
            cena:"3500",
            velicine:[
            {
                ime:'s',
                kolicina:'30',           
            },
            {
                ime:'m',
                kolicina:'40',           
            },
            {
                ime:'l',
                kolicina:'50',           
            }],
            ocena:"4,3",
            slika:"/slike/haljina1.jpg"
        },
        {
            id:'2',
            ime:"Dress Mia",
            tip:"Haljina",
            cena:"5500",
            velicine:[
                {
                    ime:'s',
                    kolicina:'30',           
                },
                {
                    ime:'m',
                    kolicina:'40',           
                },
                {
                    ime:'l',
                    kolicina:'50',           
                }],
            ocena:"4,6",
            slika:"/slike/haljina2.jpg"
        },
        {
            id:'3',
            ime:"Dress Alice",
            tip:"Haljina",
            cena:"6000",
            velicine:[
                {
                    ime:'s',
                    kolicina:'30',           
                },
                {
                    ime:'m',
                    kolicina:'40',           
                },
                {
                    ime:'l',
                    kolicina:'50',           
                }],
            ocena:"4,8",
            slika:"/slike/haljina3.jpg"
        },
        {
            id:'4',
            ime:"Dress Melissa",
            tip:"Haljina",
            cena:"4500",
            velicine:[
                {
                    ime:'s',
                    kolicina:'30',           
                },
                {
                    ime:'m',
                    kolicina:'40',           
                },
                {
                    ime:'l',
                    kolicina:'50',           
                }],
            ocena:"4,3",
            slika:"/slike/haljina4.jpg"
        },
        {
            id:'5',
            ime:"Dress Laya",
            tip:"Haljina",
            cena:"8500",
            velicine:[
                {
                    ime:'s',
                    kolicina:'30',           
                },
                {
                    ime:'m',
                    kolicina:'40',           
                },
                {
                    ime:'l',
                    kolicina:'50',           
                }],
            ocena:"4,6",
            slika:"/slike/haljina6.jpg"
        },
        {
            id:'6',
            ime:"Jakna Lucia",
            tip:"Jakna",
            cena:"5500",
            velicine:[
                {
                    ime:'s',
                    kolicina:'30',           
                },
                {
                    ime:'m',
                    kolicina:'40',           
                },
                {
                    ime:'l',
                    kolicina:'50',           
                }],
            ocena:"4,3",
            slika:"/slike/jakna1.jpg"
        },
        {
            id:'7',
            ime:"Jakna Wilaa",
            tip:"Jakna",
            cena:"6500",
            velicine:[
                {
                    ime:'s',
                    kolicina:'30',           
                },
                {
                    ime:'m',
                    kolicina:'40',           
                },
                {
                    ime:'l',
                    kolicina:'50',           
                }],
            ocena:"4,2",
            slika:"/slike/jakna2.jpg"
        },
        {
            id:'8',
            ime:"Majica Wilaa",
            tip:"Majica",
            cena:"1500",
            velicine:[
                {
                    ime:'s',
                    kolicina:'30',           
                },
                {
                    ime:'m',
                    kolicina:'40',           
                },
                {
                    ime:'l',
                    kolicina:'50',           
                }],
            ocena:"4,2",
            slika:"/slike/majica1.jpg"
        },
        {
            id:'9',
            ime:"Majica Alice",
            tip:"Majica",
            cena:"1500",
            velicine:[
                {
                    ime:'s',
                    kolicina:'30',           
                },
                {
                    ime:'m',
                    kolicina:'40',           
                },
                {
                    ime:'l',
                    kolicina:'50',           
                }],
            ocena:"4,3",
            slika:"/slike/majica2.jpg"
        },
        {
            id:'10',
            ime:"Majica Kaya",
            tip:"Majica",
            cena:"1500",
            velicine:[
                {
                    ime:'s',
                    kolicina:'30',           
                },
                {
                    ime:'m',
                    kolicina:'40',           
                },
                {
                    ime:'l',
                    kolicina:'50',           
                }],
            ocena:"4,2",
            slika:"/slike/majica3.jpg"
        },
    ]
    const izmeniProizvod=(id)=> {
         
        const pr=niz.filter(p=>p.id===id)
        console.log(pr)
        setNazivIzmena(pr.map((pod)=>pod.ime))
        setTipIzmena(pr.map((pod)=>pod.tip))
        setCenaIzmena(pr.map((pod)=>pod.cena))
        let vel=""
        let kol=""
        pr.map(pod=>{
           pod.velicine.map(v=>{
               vel+=v.ime+","
               kol+=v.kolicina+","

           })
        })
        setVelicinaIzmena(vel)
        setKolicinaIzmena(kol)
        setSlikaIzmenaSrc(pr.map((pod)=>pod.velicine))
        setModalIzmeni(true)     
        
  }
  const izmeniSliku=(e)=>{
    if(e.target.files && e.target.files[0])
    {
      let imgFile=e.target.files[0]
      const reader= new FileReader()
      reader.onload=x=>{
        
        setSlikaIzmenaSrc(x.target.result)
      }
      reader.readAsDataURL(imgFile)
      setSlikaIzmenaFile(imgFile)
      setSlikaIzmenaIme(imgFile.name)
    }
  }
  const dodajSliku=(e)=>{
    if(e.target.files && e.target.files[0])
    {
      let imgFile=e.target.files[0]
      const reader= new FileReader()
      reader.onload=x=>{
        
        setSlikaSrc(x.target.result)
      }
      reader.readAsDataURL(imgFile)
      setSlikaFile(imgFile)
      setSlikaIme(imgFile.name)
    }
  }

    const svaRoba=useMemo(()=>{
      

        let obv=niz;
        
        setUkupnoStavki(obv.length)
    
        return obv.slice((trStranica-1)*STAVKE_PO_STRANICI,(trStranica-1)*STAVKE_PO_STRANICI+STAVKE_PO_STRANICI)

     },[proizvodi,trStranica])

 const pogledajPorudzbine=()=>{
     setModalPorudzbina(true)


 }

    
  return (
  <div className='divGlavniProizvodi'>
      <div className='divLeftProizvodi'>
          <label className='labProizvodi'>Ime: Andrea</label>
          <label className='labProizvodi'>Prezime: Popović</label>
          <label className='labProizvodi'>Ulica: BogdanaP</label>
          <label className='labProizvodi'>Broj: 5</label>
          <label className='labProizvodi'>Grad: Niš</label>
          <label className='labProizvodi'>Broj racuna: 5555-9999</label>
          <label className='labProizvodi'><i class="bi bi-cart"/> 0 rsd</label>
          <button className='btnProizvodi' onClick={()=>pogledajPorudzbine()}>Pogledaj svoju porudzbinu </button>
      </div>

      <div className='divRightProizvodi'>
          <div className='divPomRight'>
          <PaginationComponent
             className='pagination'
             ukupno={ukupnoStavki}
            stavkePoStranici={STAVKE_PO_STRANICI}
            trenutnaStranica={trStranica}
            promeniStranicu={page=>setTrStranica(page)}/>
          <i class="bi bi-funnel"/> 
          <select>
              <option value='0'> Sve</option>
              <option value='1'> Majice</option>
              <option value='2'> Bluze</option>
              <option value='3'> Košulje</option>
              <option value='4'> Jakne</option>
              <option value='5'> Pantalone</option>
              <option value='6'> Torbe</option>
              <option value='7'> Kaiševi</option>
          </select>
           <i class="bi bi-sort-down"/> 
           <select>
              
              <option value='1'> Prvo najjeftinje</option>
              <option value='2'> Prvo najjskuplje</option>
              
          </select>
          <button className='dugmeProizvodd' onClick={()=>setModalDodaj(true)}>Dodaj novi proizvod </button>
          </div>
         <div className='proizvodiii'>
         { svaRoba.map((proizvod,i)=>(
             <div className='proizvod' key={i}>
                 <div className='divSlikaProizvoda'>
                 <img src={proizvod.slika} alt='..' className='slikaProizvoda'/>
                 Oceni:
                 <div>               
                  {[...Array(5)].map((star,i)=>{
                     const pom=i+1
                     return (
                    <label>
                        <input type='radio' name='ocena' size={5} value={pom} className='inputOcena'
                        onClick={()=>setOcena(pom)}
                        />
                        <FaStar size={25} className='star' color={pom<=ocena?"#ffc107":"e4e5e9"}/>
                    </label>
                
                )})}
                </div>

                 </div>
                 <div className='opisProizvoda'>
                     <label>Naziv: {proizvod.ime} </label>
                     <label>Tip artikla: {proizvod.tip}</label>
                     <label>Cena: {proizvod.cena}</label>
                     <label>Dostupne velicine: {proizvod.velicine.map((vel,i)=>{
                         return(
                             <label> {vel.ime} : {vel.kolicina} </label>
                         )

                     })}</label>
                     <label>Ocena: {proizvod.ocena}</label>
                     <div className='dugmiciProizvod'>
                         <button className='dugmeProizvod'>Obrisi</button>
                         <button className='dugmeProizvod' onClick={()=>izmeniProizvod(proizvod.id)}>Izmeni</button>
                         <button className='dugmeProizvod' onClick={()=>setModal(true)}>Dodaj u <i class="bi bi-cart"/></button>
                     </div>
                 </div>
             </div>
              ))}
         </div>

      </div>

      <Modal show={modal} className='modaal'>
              
              <Modal.Body className='modaal'>
              <label className='labModal'>Količina: 
              <input className='inputModal' type="number"/></label>
              <label className='labModal'>Veličina: 
                  <select className='inputModal'>
                      <option>XS</option>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option> 
                      <option>XL</option>
                  </select></label>
             </Modal.Body>
              <Modal.Footer >
                  <Button >Potvrdi</Button>
                  <Button onClick={()=>setModal(false)}>Poništi</Button>
              </Modal.Footer>
       </Modal>
       <Modal show={modalIzmeni} className='modaal'>
              
              <Modal.Body className='modaal'>
               <label className='labModal'>Slika:
               <input type='file'
               placeholder='Izaberi sliku'
               id='slikaIzmena'
               className='form-control-file chooseFile inputModal' onChange={izmeniSliku}/></label>
              <label className='labModal'>Naziv: 
              <input className='inputModal' type="text" defaultValue={nazivIzmena} /></label>
              <label className='labModal'>Tip:
              <input className='inputModal' type="text" defaultValue={tipIzmena}/></label>
              <label className='labModal'>Cena: 
              <input className='inputModal' type="number" defaultValue={cenaIzmena}/></label>
              <label className='labModal'>Veličine: 
              <input className='inputModal' type="text" defaultValue={velicinaIzmena}/></label>
              <label className='labModal'>Količina: 
              <input className='inputModal' type="text" defaultValue={kolicinaIzmena}/></label>
              
             </Modal.Body>
              <Modal.Footer >
                  <Button >Potvrdi</Button>
                  <Button onClick={()=>setModalIzmeni(false)}>Poništi</Button>
              </Modal.Footer>
          </Modal>
          <Modal show={modalDodaj} className='modaal'>
              
              <Modal.Body className='modaal'>
               <label className='labModal'>Slika:
               <input type='file'
               placeholder='Izaberi sliku'
               id='slikaIzmena'
               className='form-control-file chooseFile inputModal' onChange={dodajSliku}/></label>
              <label className='labModal'>Naziv: 
              <input className='inputModal' type="text"  /></label>
              <label className='labModal'>Tip:
              <input className='inputModal' type="text" /></label>
              <label className='labModal'>Cena: 
              <input className='inputModal' type="number" /></label>
              <label className='labModal'>Veličine: 
              <input className='inputModal' type="text" /></label>
              <label className='labModal'>Količina: 
              <input className='inputModal' type="text" /></label>
              
             </Modal.Body>
              <Modal.Footer >
                  <Button >Potvrdi</Button>
                  <Button onClick={()=>setModalDodaj(false)}>Poništi</Button>
              </Modal.Footer>
          </Modal>

          <Modal show={modalPorudzbina} className='modaal'>
            <Modal.Body className='modaal'>
                <div className='divModal'>
                    <label>Naziv: Majica</label>
                    <label>Velicina: L</label>
                    <label>Cena: 2500</label>
                    <label>Placena: Nije</label>
                    <label>Datum placanja:/</label>
                    <label>Datum porucivanja:25.06.2022. </label>

                </div>
            </Modal.Body>
            <Modal.Footer >
                <Button >Potvrdi</Button>
                <Button onClick={()=>setModalPorudzbina(false)}>Ok</Button>
            </Modal.Footer>
         </Modal>




  </div>
  )
}
