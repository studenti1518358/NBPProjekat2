import {Table} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import Narudzbina from './Narudzbina'
export default function Narudzbine(){

    const [narudzbine,setNarudzbine]=useState([])

    useEffect(()=>{
        const pokupiNarudzbine=async()=>{

            const response=await fetch("http://localhost:5000/Narudzbine/getSveNarudzbine")
            console.log(response)
            if(response.status===200){
                const niz=await response.json()
                setNarudzbine(niz)
                console.log(niz)
                console.log("cao")
            }
            else console.log("hej")
        }
        pokupiNarudzbine()

    },[])

    return(
       <Table  striped bordered hover>
           
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
           {narudzbine.map((narudzbina,index)=>{
            return (<Narudzbina key={index} narudzbina={narudzbina}></Narudzbina>)
           
        })}
        </tbody>
       </Table>
    )
}