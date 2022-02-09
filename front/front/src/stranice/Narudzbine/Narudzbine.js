import {Table} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import Narudzbina from './Narudzbina'

import PaginationComponent from '../../komponente/PaginationComponent'
export default function Narudzbine(){

    const [narudzbine,setNarudzbine]=useState([])
    const [stavke,setStavke]=useState([])
    const [trStranica,setTrStranica]=useState(1)

    useEffect(()=>{
        setStavke(narudzbine.slice((trStranica-1)*6,(trStranica-1)*6+6))

    },[trStranica,narudzbine])

    useEffect(()=>{
        const pokupiNarudzbine=async()=>{

            const response=await fetch("http://localhost:5000/Narudzbine/getSveNarudzbine")
            console.log(response)
            if(response.status===200){
                const niz=await response.json()
                setNarudzbine(niz)
                setTrStranica(1)
              
            }
            else console.log("hej")
        }
        pokupiNarudzbine()

    },[])

    return(
        <>
        <h2>Sve porudzbine</h2>
          <PaginationComponent
             className='pagination pagNar'
             ukupno={narudzbine.length}
            stavkePoStranici={6}
            trenutnaStranica={trStranica}
            promeniStranicu={page=>setTrStranica(page)}/>
       <Table className='narTab'  striped bordered hover>
           
           <thead>
               <tr>
               <th>Naziv proizvoda</th>
               <th>Cena proizvoda</th>
               <th>Velicina proizvoda</th>
               <th>Status narudzbine</th>
               <th>Datum narucivanja</th>
               <th>Datum placanja</th>
               <th>Kupac</th>
               </tr>
           </thead>
        <tbody>
           {stavke.map((narudzbina,index)=>{
            return (<Narudzbina key={index} narudzbina={narudzbina}></Narudzbina>)
           
        })}
        </tbody>
       </Table>
       </>
    )
}