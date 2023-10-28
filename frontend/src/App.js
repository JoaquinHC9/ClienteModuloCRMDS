import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import React from 'react';
import Sidebar from './components/Sidebar';
import Registro from './pages/Registro';
import Main from './pages/Main';
import ModificarCliente from './pages/ModificarCliente';
import { Helmet } from 'react-helmet';
import Busqueda from "./pages/Busqueda";
import Perfil from "./pages/Perfil";
import GestionLinea from "./pages/GestionLinea";
import PerfilLinea from "./pages/PerfilLinea";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Modulo Clientes</title>
      </Helmet>
      <BrowserRouter>        
        <Sidebar />
        <div className="App-container">          
          <div className="App-content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/Registro" element={<Registro />} />
              <Route path="/ModificarCliente" element={<ModificarCliente/>} />
              <Route path="/Busqueda" element={<Busqueda />} />
              <Route path="/perfil/:dni" element={<Perfil/>} />
              <Route path="/Lineas/:dni" element={<GestionLinea/>} />
              <Route path="/PerfilLinea/:numTelefono" element={<PerfilLinea />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
