import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import React from 'react';
import Sidebar from './components/Sidebar';
import Registro from './pages/Registro';
import Main from './pages/Main';
import { Helmet } from 'react-helmet';
import Busqueda from "./pages/Busqueda";
import PerfilCliente from "./pages/PerfilCliente";
import GestionLinea from "./pages/GestionLinea";
import PerfilLinea from "./pages/PerfilLinea.js";
import DarDeBaja from "./pages/DarDeBaja.js";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Modulo Clientes</title>
      </Helmet>
      <Sidebar />
      <BrowserRouter>                
        <div className="App-container">          
          <div className="App-content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/Registro" element={<Registro />} />              
              <Route path="/Busqueda" element={<Busqueda />} />              
              <Route path="/Perfil/:dni" element={<PerfilCliente/>} />
              <Route path="/Lineas/:dni" element={<GestionLinea/>} />
              <Route path="/PerfilLinea/:numTelefono" element={<PerfilLinea />} />
              <Route path="/DarDeBaja/:numTelefono" element={<DarDeBaja />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
