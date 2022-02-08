
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './komponente/Navbar'
import Pocetna from './stranice/Pocetna'
import PrijaviSe from './stranice/PrijaviSe/PrijaviSe'
import RegistrujSe from './stranice/PrijaviSe/RegistrujSe'
import Formular from './stranice/PrijaviSe/Formular'
import Proizvodi from './stranice/Proizvodi/Proizvodi'
import Prodaje from './stranice/Prodaja/Prodaje'
import Narudzbine from './stranice/Narudzbine/Narudzbine'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Grafikon from './stranice/Prodaja/Grafikon'
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          
          <Route path='/' element={<Pocetna/>}/>
          <Route path='/PrijaviSe' element={<PrijaviSe/>}/>
          <Route path='/RegistrujSe' element={<RegistrujSe/>}/>
          <Route path='/Formular' element={<Formular/>}/>
          <Route path='/Proizvodi' element={<Proizvodi/>}/>
          <Route path='/Prodaje' element={<Prodaje />}/>
          <Route path='/Grafikon' element={<Grafikon />}/>
          <Route path='/Narudzbine' element={<Narudzbine/>}/>
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
