import React from 'react'
import './Pocetna.css'

import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit'

import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact"
import slide1 from './slide.jpg'
import slide2 from './slide2.jpg'
import slide3 from './slide3.jpg'
import slide4 from './slide4.jpg'



export default function Pocetna() {
  return(
  <div className="divGlavniPocetna">
    <div className='pomCarousel'>
    <MDBCarousel showControls showIndicators className="divCarousel">
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
        <MDBCarouselCaption>
            
            <h5 className='naslovCarousel'>Nova kolekcija</h5> 
          </MDBCarouselCaption>
          <MDBCarouselElement src={slide3} alt='...' />
         
        </MDBCarouselItem>
        <MDBCarouselItem>
          <MDBCarouselElement src={slide2} alt='...' />
          <MDBCarouselCaption>
          <h5 className='naslovCarousel'>Nova kolekcija</h5> 
           
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem>
          <MDBCarouselElement src={slide1} alt='...' />
          <MDBCarouselCaption>
          <h5 className='naslovCarousel'>Nova kolekcija</h5> 
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem>
          <MDBCarouselElement src={slide4} alt='...' />
          <MDBCarouselCaption>
          <h5 className='naslovCarousel'>Nova kolekcija</h5> 
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </div>

    <div className='pomPocetnaDiv'>
      <div className='pompomPocetna'>
        <h3 style={{color:'white'}}>Najbolji kvalitet <i style={{color:'green'}} className="bi bi-check2-all"/></h3>
         <p>
           U našem butiku možete pronaći robu izuzetnog kvaliteta. Možemo se pohvaliti hiljadama zadovoljnih mušterija i minimalnim brojem reklamacija.
           Ako ste daleko iskoristite ovu aplikaciju za Vašu nezaboravnu kupinu. Ne propustite šansu i uverite se u ovaj kvalitet po izuzetno niskim cenama!
         </p>
      </div>
      <div className='pompomPocetna'>
        <h3 style={{color:'white'}}>Širok asortiman <i style={{color:'green'}} className="bi bi-check2-all"/></h3>
         <p>
           Kod nas možete pronaći sve što vam je potrebno. Od preudobne obuće, izuzetno kvalitetnih kožnih torbi, kaiševa i nakita, pa sve do najmodernijih jakni, pantalona, majica i košulja.
           Takodje nudimo širok asortiman haljina za apsolutno svaku priliku. 
         </p>
      </div>
      <div className='pompomPocetna'>
        <h3 style={{color:'white'}}>Veliki popusti <i style={{color:'green'}} className="bi bi-check2-all"/></h3>
         <p>
           Nudimo Vam izuzetan kvalitet za izuzetno niske cene.Koristite ovu aplikaciju kako bi uvek bili upućeni i imali mogućnost da iskoriste ogromne popuste koji kod nas nisu retkost.
           Registrujte se ako vec niste i započnite svoje nezaboravno iskustvo.
         </p>
      </div>
      
    </div>
    
    <MDBFooter  className="font-small pt-4 mt-4 footer">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Kontatk:</h5>
            <p>
             Kontaktirajte nas ili posetite naše profile na društvenim mrežama
            </p>
            <p>
            <i class="bi bi-telephone"/> 456-855-685
            </p>
            <p>
            <i class="bi bi-telephone"/> 488-999-685
            </p>
            <p>
            <i class="bi bi-phone"/> 069-999-888-555
            </p>
            <p>
            <i class="bi bi-phone"/> 061-555-888-555
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Društvene mreže</h5>
            <ul>
              <li className="list-unstyled">
              <i class="bi bi-instagram"/> @boutique
              </li>
              <li className="list-unstyled">
              <i class="bi bi-facebook"/> @boutique
              </li>
              <li className="list-unstyled">
              <i class="bi bi-twitter"/> @boutique
              </li>
              
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: Boutique 
        </MDBContainer>
      </div>
    </MDBFooter>

  </div>
  ) 
}
