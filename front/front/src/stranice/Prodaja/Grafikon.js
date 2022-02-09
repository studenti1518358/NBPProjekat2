import React, {Component,useEffect,useState} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './Grafikon.css'
import {Button} from 'react-bootstrap';
Chart.register(...registerables);

function Grafikon(){
        const [graf,setGraf]=useState(false)
        const [mesec,setMesec]=useState(1)
        const [godina,setGodina]=useState(2022)
        const [cene,setCene]=useState([])

       
        const pretrazi=async ()=>{
            const response=await fetch("http://localhost:5000/Narudzbine/getZaradePoProizvodima/"+mesec+"/"+godina)
            if(response.status===200){
                const niz=await response.json()
                const labels=niz.map(x=>x._id+" ("+x.cena+"rsd)")
                const brojke=niz.map(x=>x.total)
                console.log(labels)
                
                const noviGraf={
                    
                        labels:labels,
                        datasets:[{
                            label:'Najprodavaniji komadi',
                            data:brojke,
                            backgroundColor:[
                                'rgba(165,42,42,0.6)',
                                'rgba(255,140,0,0.6)',
                        'rgba(255,255,0,0.6)',
                        'rgba(124,252,0,0.6)',
                        'rgba(0,0,255,0.6)',
                        'rgba(139,0,139,0.6)'
                               
                            ]
                        }
                        ]
                    
                }
                setGraf(noviGraf)

            }
            else{setGraf(false)
            alert("Nema prodaja za ovaj mesec u godini!")}

        }
       
    

   
        return(
            <div className='grafikon'>
                <h3>Statistika najprodavanijih proizvoda</h3>
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
               {graf && (<div><Bar
                    data = {graf}
                    options={{
                        title:{
                            display:true,
                            text:'Najprodavaniji proizvod',
                            fontSize:30
                        },
                        legend:{
                            display: true
                        }
                    }}
                />
                <Line
                    data = {graf}
                    options={{
                        title:{
                            display:true,
                            text:'Najprodavaniji komadi',
                            fontSize:30
                        },
                        legend:{
                            display: true
                        }
                    }}
                />
                <Pie
                    data = {graf}
                    options={{
                        title:{
                            display:true,
                            text:'Najprodavaniji komadi',
                            fontSize:30
                        },
                        legend:{
                            display: true
                        }
                    }}
                /></div>)}
            </div>
        )
    }

export default Grafikon;