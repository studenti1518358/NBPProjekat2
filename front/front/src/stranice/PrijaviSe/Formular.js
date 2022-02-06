import React from 'react'
import './Formular.css'

export default function FormPrva() {
    
  
  
    return (
        <div className='Formular'>
             <label className='lblFormular'>*Unesite dodatne informacije o sebi - <label className='lblFormularInfo'>popuna ovih polja je obavezna :</label> </label>
            <div className='divFormularPrva'>
              
            <div className="form-group">
              <label htmlFor="username">Ime:</label>
              <input type="text" name="username" className='inputFormular' placeholder="Ime:"   />    
            </div>
            <div className="form-group">
              <label htmlFor="username">Prezime:</label>
              <input type="text" name="username" className='inputFormular'  placeholder="Prezime:"  />
            </div>

            <div className="form-group">
              <label htmlFor="username">Ulica:</label>
              <input type="text" name="username" className='inputFormular'  placeholder="Ulica:" />
            </div>

            <div className="form-group">
              <label htmlFor="username">Broj:</label>
              <input type="number" name="username" className='inputFormular'  placeholder="Broj:" />
            </div>
            
            <div className="form-group">
              <label htmlFor="username">Mesto stanovanja:</label>
              <input type="text" name="username" className='inputFormular'  placeholder="Mesto stanovanja:" />
            </div>

            <div className="form-group">
              <label htmlFor="username">Broj telefona:</label>
              <input type="number" name="username" className='inputFormular'  placeholder="Broj telefona:" />
            </div>

            <div className="form-group">
              <label htmlFor="username">Broj računa:</label>
              <input type="number" name="username" className='inputFormular'  placeholder="Broj telefona:" />
            </div>
            
            
            <div className="form-group">
              <label htmlFor="username">Registruj se kao:</label>
              <select  className='inputFormular'>
                <option value='1'>Kupac</option>
                <option value='2'>Prodavac</option>
                </select>

            </div>
            

            <button
                className='btnPocetna' >
                Potvrdi
                </button>


            </div>
        </div>
    )
}
