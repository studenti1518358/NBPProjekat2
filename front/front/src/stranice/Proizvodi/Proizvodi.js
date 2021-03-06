import React ,{useState,useMemo, useEffect}from 'react'
import './Proizvodi.css'
import axios from 'axios'
import {FaStar} from 'react-icons/fa'
import {Table,Button,Modal,Alert,Row} from 'react-bootstrap'
import PaginationComponent from '../../komponente/PaginationComponent'
import NaruciModal from './NaruciModal'
import Korpa from './Korpa'
import {useNavigate} from 'react-router-dom'
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
    const [opisIzmena,setOpisIzmena]=useState("")
    const [velicineIzmena,setVelicineIzmena]=useState("")
    const [kolicineIzmena,setKolicineIzmena]=useState("")
    const [velKolIzmena,setVelKolIzmena]=useState([])
    const [slikaIzmenaIme,setSlikaIzmenaIme]=useState("")
    const [slikaIzmenaSrc,setSlikaIzmenaSrc]=useState("")
    const [slikaIzmenaFile,setSlikaIzmenaFile]=useState(null)
    const [slikaIme,setSlikaIme]=useState("")
    const [slikaSrc,setSlikaSrc]=useState("")
    const [slikaFile,setSlikaFile]=useState(null)
    const [velicinaIzmena,setVelicinaIzmena]=useState("")
    const [kolicinaIzmena,setKolicinaIzmena]=useState("")
    const STAVKE_PO_STRANICI=3
    const [nazivNovi,setNazivNovi]=useState("")
    const [tipNovi,setTipNovi]=useState("")
    const [cenaNovi,setCenaNovi]=useState("")
    const [opisNovi,setOpisNovi]=useState("")
    const [velicineNovi,setVelicineNovi]=useState("")
    const [kolicineNovi,setKolicineNovi]=useState("")
    const [velKolNovi,setVelKolNovi]=useState([])
    const [mojiProizvodi,setMojiProizvodi]=useState([])
    const [ukupnoProizvoda,setUkupnoProizvoda]=useState(0)
    const [minCena,setMinCena]=useState(0)
    const [maxCena,setMaxCena]=useState(10000000)
    const [tipovi,setTipovi]=useState([])
    const [tip,setTip]=useState('Svi')
    const [ocene,setOcene]=useState([])
    const prijavljen=localStorage.getItem('prijavljen')
    const [korisnik,setKorisnik]=useState({})
    const [naruciProizvod,setNaruciProizvod]=useState({})
    const [admin,setAdmin]=useState(false)
	const [izmenaId,setIzmenaId]=useState("")
	const [ocenaIzmena,setOcenaIzmena]=useState(0)
	const [brGlasovaIzmena,setBrGlasovaIzmena]=useState(0)
	//const [velicineIzmena,setNoveVelicine]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        const preuzmi=async()=>{
            const response=await fetch('http://localhost:5000/Prodavnica/getProdavnica')
            console.log(response)
            if(response.status===200){
                const prodavnica=await response.json()
                console.log(prodavnica)
                if(prodavnica.tipoviProizvoda){
                    
                    const tipovi=prodavnica.tipoviProizvoda
                    tipovi.unshift('Svi')
                    setTipovi(tipovi)
                }
            }
            const response1=await fetch('http://localhost:5000/Korisnik/getKorisnik',{
         
                headers:{'Content-Type':'application/json'},
                credentials:'include'
                
               
              })
            if(response1.status===200){
                const kor=await response1.json()
                setKorisnik(kor)
            }
            else
            {
                localStorage.clear()
                navigate("/")
               // window.location.reload()
            }
        }
        preuzmi()
        if(localStorage.getItem("status")==='2')
        {
          setAdmin(true)
        }
  

    },[])
    
    const izmeniProizvod=(id)=> {
         
        const pr=mojiProizvodi.find(p=>p.id===id)
		
        console.log(pr)
        setNazivIzmena(pr.naziv)
        setTipIzmena(pr.tip)
        setCenaIzmena(pr.cena)
		setIzmenaId(id)
        let vel=""
        let kol=""
       
           pr.velicine.map(v=>{
               vel+=v.naziv+","
               kol+=v.kolicina+","

           })
       
        setVelicineIzmena(vel)
		
        setKolicineIzmena(kol)
        setOpisIzmena(pr.opis)
        setSlikaIzmenaSrc(pr.slikaSrc)
		setOcenaIzmena(pr.ocena)
		setBrGlasovaIzmena(pr.brojGlasova)
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
  const dodajNoviProizvod=()=>{
     
      var vel=velicineNovi.split(',')
      var kol=kolicineNovi.split(',')
      const velicine=[]
      for(let i=0;i<vel.length;i++)
      {
          velicine[i]={naziv:vel[i],kolicina:kol[i]}
      }
      const formData=new FormData()
      formData.append("slikaFile",slikaFile)
      axios.post("http://localhost:5000/Proizvod/DodajNovuSliku",formData).then(p=>{  
       
        fetch("http://localhost:5000/Proizvod/DodajNoviProizvod",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {
                    naziv: nazivNovi,
                    cena: cenaNovi,
                    opis: opisNovi,
                    slikaSrc: p.data,
                    velicine: velicine,
                    tip: tipNovi
                  }
            )
          }).then(q=>{
              if(q.ok)
              {
                  setModalDodaj(false)
				  alert("Uspesno dodat novi proizvod!")
              }
          })
        

      })
        
      
      
  }
  const IzmeniProizvod=async()=>{
    console.log(velicineIzmena)
	console.log(kolicineIzmena)
    var vel=velicineIzmena.split(',')
      var kol=kolicineIzmena.split(',')
	  console.log(vel)
	  console.log(kol)
	  const len=!vel[vel.length-1]?vel.length-1:vel.length
      console.log(len)
      for(let i=0;i<len;i++)
      {
		 
          velKolIzmena[i]={naziv:vel[i],kolicina:Number(kol[i])}
      }
      const formData=new FormData()
      formData.append("slikaFile",slikaIzmenaFile)
	  if(!slikaIzmenaFile){
		    const azuriranProizvod= {
                    naziv: nazivIzmena,
                    cena: cenaIzmena,
                    opis: opisIzmena,
                    slikaSrc: slikaIzmenaSrc,
                    velicine: velKolIzmena,
                    tip: tipIzmena,
					ocena:ocenaIzmena,
					brojGlasova:brGlasovaIzmena
					
                  }
		    const response=await fetch("http://localhost:5000/Proizvod/azurirajProizvod/"+izmenaId,{
            method:"PUT",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(azuriranProizvod
               
            )
          })
		  if(response.status===200){
			    setModalIzmeni(false)
				  alert("Uspesno azurian proizvod")
				  window.location.reload()
		  }
		  return
	  }
      axios.post("http://localhost:5000/Proizvod/DodajNovuSliku",formData).then(p=>{  
	    const azuriranProizvod= {
                    naziv: nazivIzmena,
                    cena: cenaIzmena,
                    opis: opisIzmena,
                    slikaSrc: p.data,
                    velicine: velKolIzmena,
                    tip: tipIzmena,
					ocena:ocenaIzmena,
					brojGlasova:brGlasovaIzmena
					
                  }
				  console.log(izmenaId)
				  console.log(azuriranProizvod)
       
        fetch("http://localhost:5000/Proizvod/azurirajProizvod/"+izmenaId,{
            method:"PUT",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(azuriranProizvod
               
            )
          }).then(q=>{
			  console.log(q)
			  
              if(q.ok)
              {
                  setModalIzmeni(false)
				  alert("Uspesno azurian proizvod")
				  window.location.reload()
              }
          })
        

      })
        

  }
  const obrisiProizvod=(ime)=>{
    fetch("http://localhost:5000/Proizvod/obrisiProizvod/"+ime,{
        method:"DELETE"
        
      }).then(q=>{
          if(q.ok)
          {
			  alert("Uspesno obrisan proizvod")
              window.location.reload()
          }
      })

  }


 const pogledajPorudzbine=()=>{
     setModalPorudzbina(true)


 }

 const pretraziProizvode=()=>{
     const pretraga=async()=>{
         const response=await fetch("http://localhost:5000/Proizvod/pretraziProizvode",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {
                    tipProizvoda: tip,
                    brojStranice: 0,
                    brProizvodaPoStranici: 20,
                    minCena: minCena?minCena:0,
                    maxCena: maxCena?maxCena:1000000
                  }
            )
          })
          if(response.status===200){
              const ukupno=await response.json()
              console.log(ukupno)
              const response1=await fetch("http://localhost:5000/Proizvod/pretraziProizvode",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(
                    {
                        tipProizvoda: tip,
                        brojStranice: 1,
                        brProizvodaPoStranici: 3,
                        minCena: minCena?minCena:0,
                        maxCena: maxCena?maxCena:1000000
                      }
                )
              })
              if(response1.status===200){
                  const proizvodi=await response1.json()
                  console.log(proizvodi)
                  setTrStranica(1)
                  setMojiProizvodi(proizvodi)
                  setUkupnoProizvoda(ukupno)
                  setOcene(proizvodi.map(x=>x.ocena))
              }

          }
     }
     pretraga()
 }
 useEffect(()=>{

    const nadjiProizvode=async()=>{
        const response1=await fetch("http://localhost:5000/Proizvod/pretraziProizvode",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {
                    tipProizvoda: tip,
                    brojStranice: trStranica,
                    brProizvodaPoStranici: 3,
                    minCena: minCena?minCena:0,
                    maxCena:  maxCena?maxCena:1000000
                  }
            )
          })
          if(response1.status===200){
              const proizvodi=await response1.json()
              console.log(proizvodi)
              setOcene(proizvodi.map(x=>x.ocena))
              setMojiProizvodi(proizvodi)
              
          }
        if(trStranica===1){
          const response=await fetch("http://localhost:5000/Proizvod/pretraziProizvode",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {
                    tipProizvoda: tip,
                    brojStranice: 0,
                    brProizvodaPoStranici: 20,
                    minCena: minCena?minCena:0,
                    maxCena:  maxCena?maxCena:1000000
                  }
            )
          })
          if(response.status===200){
              const ukupno=await response.json()
              setUkupnoProizvoda(ukupno)
          }
        }
          

    }
    nadjiProizvode()

 },[trStranica])

    
  return (
  <div className='divGlavniProizvodi'>
     {korisnik && korisnik.adresa && ( <div className='divLeftProizvodi'>
          <label className='labProizvodi'><b>Ime:</b> {korisnik.ime}</label>
          <label className='labProizvodi'><b>Prezime:</b> {korisnik.prezime}</label>
          <label className='labProizvodi'><b>Ulica:</b> {korisnik.adresa.ulica}</label>
          <label className='labProizvodi'><b>Broj:</b> {korisnik.adresa.broj}</label>
          <label className='labProizvodi'><b>Grad:</b> {korisnik.adresa.mesto}</label>
          <label className='labPostanski'><b>Postanski broj:</b></label>
          <label className='labProizvodi' > {korisnik.adresa.postanskiBroj}</label>
        
          <Button className='btnProizvodi' onClick={()=>pogledajPorudzbine()}>Pogledaj porudzbine </Button>
      </div>)}

      <div className='divRightProizvodi'>
          <div className='divPomRight'>
          <PaginationComponent
             className='pagination'
             ukupno={ukupnoProizvoda}
            stavkePoStranici={STAVKE_PO_STRANICI}
            trenutnaStranica={trStranica}
            promeniStranicu={page=>setTrStranica(page)}/>
           <div className='tipovi'>
          <i class="bi bi-funnel"/> 
          <select onChange={e=>setTip(e.target.value)}>
             {tipovi.map(tip=>{
                 return(<option value={tip}>{tip}</option>)
             })}
          </select>
		  </div>
          
              <div className='grupa'>
             <label className='filterLab'>Minimalna cena</label>
             <input type='number'  onChange={e=>setMinCena(e.target.value)} ></input>
			 </div>
			 <div className='grupa'>
             <label className='filterLab'>Maximalna cena</label>
             <input type='number'  onChange={e=>setMaxCena(e.target.value)} ></input>
			 </div>
			   <Button className='pretraziDugme' onClick={pretraziProizvode}>Pretrazi</Button>
             </div>
			  
         <div>
        
        {admin?  <Button className='dugmeProizvodd' onClick={()=>setModalDodaj(true)}>Dodaj novi proizvod </Button>:null}
          </div>
         <div className='proizvodiii'>
         { mojiProizvodi.map((proizvod,ind)=>(
             <div className='proizvod' key={ind}>
                 <div className='divSlikaProizvoda'>
                 <img src={proizvod.slikaSrc} alt='..' className='slikaProizvoda'/>
                 Oceni:
                 <div>               
                  {[...Array(5)].map((star,i)=>{
                     const pom=i+1
                     const oceni=async(ocena)=>{
                        setOcena(pom)
                        let noveOcene=[...ocene]
                        noveOcene[ind]=pom
                        setOcene(noveOcene)
                        const response=await fetch('http://localhost:5000/Proizvod/oceniProizvod/'+ocena+'/'+proizvod.naziv,{
                        method:"POST",
                        headers:{'Content-Type':'application/json'}})
                        if(response.status===200){
                            
                            const novaOcena=await response.json()
                            let proizvodi=[...mojiProizvodi]
                            let izmenjenProizvod=proizvod
                            izmenjenProizvod.ocena=novaOcena
                            izmenjenProizvod.brojGlasova=proizvod.brojGlasova+1
                            proizvodi[ind]=izmenjenProizvod
                            setMojiProizvodi(proizvodi)
                        
                        }

                     }
                     return (

                    <label>
                        <input type='radio' name='ocena' size={5} value={pom} className='inputOcena'
                        onClick={()=>oceni(pom)}
                        />
                        <FaStar size={25} className='star' color={pom<=ocene[ind]?"#ffc107":"e4e5e9"}/>
                    </label>
                
                )})}
                </div>

                 </div>
                 <div className='opisProizvoda'>
                     <label>Naziv: {proizvod.naziv} </label>
                     <label>Tip artikla: {proizvod.tip}</label>
                     <label>Cena: {proizvod.cena}</label>
					 <label>Opis: {proizvod.opis}</label>
                     <label>Dostupne velicine: {proizvod.velicine.map((vel,i)=>{
                         return(
                             <label> {vel.naziv} ( {vel.kolicina} komada), </label>
                         )

                     })}</label>
                     <label>Ocena: {proizvod.ocena.toFixed(2)} (broj glasova: {proizvod.brojGlasova})</label>
                     <div className='dugmiciProizvod'>
                      {admin? <button className='dugmeProizvod' onClick={()=>obrisiProizvod(proizvod.naziv)}>Obrisi</button>:null}
                      {admin?   <button className='dugmeProizvod' onClick={()=>izmeniProizvod(proizvod.id)}>Izmeni</button>:null}
                         <button className='dugmeProizvod' onClick={()=>{setNaruciProizvod(proizvod);setModal(true)}}>Dodaj u <i class="bi bi-cart"/></button>
                     </div>
                 </div>
             </div>
              ))}
         </div>

      </div>

     <NaruciModal modal={modal} setModal={setModal} proizvod={naruciProizvod} mejl={korisnik.mail} />
       <Modal show={modalIzmeni} className='modaal'>
              
              <Modal.Body className='modaal'>
               <label className='labModal'>Slika:
               <input type='file'
               placeholder='Izaberi sliku'
               id='slikaIzmena'
               className='form-control-file chooseFile inputModal' onChange={izmeniSliku}/></label>
              <label className='labModal'>Naziv: 
              <input className='inputModal' type="text" defaultValue={nazivIzmena} onChange={(e)=>setNazivIzmena(e.target.value)} /></label>
              <label className='labModal'>Tip:
              <input className='inputModal' type="text" defaultValue={tipIzmena} onChange={(e)=>setTipIzmena(e.target.value)} /></label>
              <label className='labModal'>Opis:
              <input className='inputModal' type="text" defaultValue={opisIzmena} onChange={(e)=>setOpisIzmena(e.target.value)} /></label>
              <label className='labModal'>Cena: 
              <input className='inputModal' type="number" defaultValue={cenaIzmena} onChange={(e)=>setCenaIzmena(e.target.value)} /></label>
              <label className='labModal'>Veli??ine: 
              <input className='inputModal' type="text" value={velicineIzmena} onChange={(e)=>setVelicineIzmena(e.target.value)}  /></label>
              <label className='labModal'>Koli??ina: 
			 
              <input className='inputModal' type="text"value={kolicineIzmena} onChange={(e)=>setKolicineIzmena(e.target.value)}/></label>
              
             </Modal.Body>
              <Modal.Footer >
                  <Button onClick={()=>IzmeniProizvod()}>Potvrdi</Button>
                  <Button onClick={()=>setModalIzmeni(false)}>Poni??ti</Button>
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
              <input className='inputModal' type="text" onChange={(e)=>setNazivNovi(e.target.value)}  /></label>
              <label className='labModal'>Tip:
              <input className='inputModal' type="text" onChange={(e)=>setTipNovi(e.target.value)} /></label>
              <label className='labModal'>Cena: 
              <input className='inputModal' type="number" onChange={(e)=>setCenaNovi(e.target.value)}/></label>
              <label className='labModal'>Opis: 
              <input className='inputModal' type="text" onChange={(e)=>setOpisNovi(e.target.value)}/></label>
			 
              <label className='labModal'>Veli??ine:
			 
              <input className='inputModal' type="text" placeholder="s,m,l" onChange={(e)=>setVelicineNovi(e.target.value)}/> </label>
              <label className='labModal'>Koli??ine:
              <input className='inputModal' type="text" placeholder="1,1,1" onChange={(e)=>setKolicineNovi(e.target.value)}/></label>
              
             </Modal.Body>
              <Modal.Footer >
                  <Button onClick={()=>dodajNoviProizvod()}>Potvrdi</Button>
                  <Button onClick={()=>setModalDodaj(false)}>Poni??ti</Button>
              </Modal.Footer>
          </Modal>

         <Korpa setModalPorudzbina={setModalPorudzbina} modalPorudzbina={modalPorudzbina} mejl={korisnik.mail} />




  </div>
  )
}
