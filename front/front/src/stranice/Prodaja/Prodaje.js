import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import './Prodaje.css'

export default function Prodaje(){

    const prodaje=[
        {nazivProizvoda:"Suknja Lara",cenaProizvoda:3450,datumProdaje:new Date().toLocaleDateString()},
        {nazivProizvoda:"Pantalone Zara",cenaProizvoda:1200,datumProdaje:new Date().toLocaleDateString()},
        {nazivProizvoda:"Cipele Lara",cenaProizvoda:3450,datumProdaje:new Date().toLocaleDateString()},
        {nazivProizvoda:"Majica Zara",cenaProizvoda:2450,datumProdaje:new Date().toLocaleDateString()},
        {nazivProizvoda:"Pantalone Bronz",cenaProizvoda:3450,datumProdaje:new Date().toLocaleDateString()},
    ]
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
             <div className="naslov"> Mesecne zarade</div>
             <div className="unos">
                 <div className='prDiv'>
                 <label className='prLab'>Mesec:</label>
                 <input className='prInput' />
                 </div>
                
                
                 <div>
                 <label className='prLab'>Godina:</label>
                 <input className='prInput' />
                 </div>
             </div>
             <BootstrapTable
        bootstrap4
        
        hover
        striped
        bordered
        keyField="id"
        data={prodaje}
        columns={columns}
      >
         
      </BootstrapTable>
        </div>

    )
}