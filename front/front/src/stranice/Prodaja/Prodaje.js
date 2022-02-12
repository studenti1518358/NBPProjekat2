import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import './Prodaje.css'
import {Component,useEffect,useState} from 'react';
import {Button} from 'react-bootstrap';
import PaginationComponent from '../../komponente/PaginationComponent'

export default function Prodaje(){
    const [mesec,setMesec]=useState(1)
    const [godina,setGodina]=useState(2022)
    const [prodaje,setProdaje]=useState([])
    const [stavke,setStavke]=useState([])
    const [trStranica,setTrStranica]=useState(1)
    const [ukupnaZarada,setUkupnaZarada]=useState(0)
    const [prikazi,setPrikazi]=useState(false)
    const [mesecZarada,setMesecZarada]=useState(1)
    const meseci=['Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novmebar','Decembar']

    useEffect(()=>{
        setStavke(prodaje.slice((trStranica-1)*6,(trStranica-1)*6+6))

    },[trStranica,prodaje])

    const pretrazi=async()=>{
        const response=await fetch("http://localhost:5000/Narudzbine/getProdajeMeseca/"+mesec+"/"+godina)
        if(response.status===200){

            const niz=await response.json();
            const niz1=niz.map(el=>{
                return {...el,datumProdaje:new Date(el.datumProdaje).toDateString()}
            })
            setProdaje(niz1)
            setTrStranica(1)
        
            setUkupnaZarada(niz.reduce((acc,x)=>x.cenaProizvoda+acc,0))
            //setProdaje(niz.map(el=>{return{...el,datumProdaje:new Date(el.datumProdaje)}}))
            setPrikazi(true)
            setMesecZarada(mesec)

        }
        else{
            setUkupnaZarada(0)
        }

    }

    
    const columns=[
        {
            dataField:"nazivProizvoda",
            text:"Naziv Proizvoda",
            sort:true
        },
        {
            dataField:"cenaProizvoda",
            text:"Cena Proizvoda",
            sort:true
        },
        {
            dataField:"datumProdaje",
            text:"Datum prodaje",
           
        }
    ]
   

    return(
        <div className="tabla">
              <h3>Mesecne prodaje</h3>
         
                <div className='unosStatistika'>
                    <div>
            <label>Mesec: </label>
            <select value={mesec} onChange={e=>setMesec(e.target.value)} >
                <option value={1}>Januar</option>
                <option value={2}>Februar</option>
                <option value={3}>Mart</option>
                <option value={4}>April</option>
                <option value={5}>Maj</option>
                <option value={6}>Jun</option>
                <option value={7}>Jul</option>
                <option value={8}>Avgust</option>
                <option value={9}>Septembar</option>
                <option value={10}>Oktobar</option>
                <option value={11}>Novembar</option>

                <option value={12}>Decembar</option>
                </select>
                </div>
                <div>
                <label>Godina: </label>
                <input value={godina} onChange={e=>setGodina(e.target.value)}  type="number" min='2010' max='2100' default={2022}></input>
                </div>
                <Button onClick={pretrazi}>Pretrazi</Button>
                </div>
                {prikazi && <h5>Ukupna zarada za mesec {meseci[mesecZarada-1]} {godina}: <b>{ukupnaZarada}rsd</b></h5>}
                <PaginationComponent
             className='pagination pagNar'
             ukupno={prodaje.length}
            stavkePoStranici={6}
            trenutnaStranica={trStranica}
            promeniStranicu={page=>setTrStranica(page)}/>
             {prodaje&&<BootstrapTable
        bootstrap4
        
        hover
        striped
        bordered
        keyField="id"
        data={stavke}
        columns={columns}
      >
         
      </BootstrapTable>}
        </div>

    )
}