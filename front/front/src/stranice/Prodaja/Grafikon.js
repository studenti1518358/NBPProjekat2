import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './Grafikon.css'
Chart.register(...registerables);

class Grafikon extends Component{
    constructor(props){
        super(props);
        this.state = {
            grafData:{
                labels:['Haljine', 'Majice', 'karirane suknje', 'teksas jakne', 'Kozne jakne', 'Farmerice'],
                datasets:[{
                    label:'Najprodavaniji komadi',
                    data:[ 1200, 1008, 899, 769, 500, 498, 470 ],
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
        }
    }

    render(){
        return(
            <div className='grafikon'>
                <Bar
                    data = {this.state.grafData}
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
                <Line
                    data = {this.state.grafData}
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
                    data = {this.state.grafData}
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
            </div>
        )
    }
}
export default Grafikon;