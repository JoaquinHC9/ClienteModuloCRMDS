import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Registro from './pages/Registro';
import Main from './pages/Main';
import CompletoRegistro from './pages/CompletoRegistro';
import { Helmet } from 'react-helmet';
import Busqueda from "./pages/Busqueda";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Modulo Clientes</title>
      </Helmet>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <div className="App-container">          
          <div className="App-content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/Registro" element={<Registro />} />
              <Route path="/RegistroCompleto" element={<CompletoRegistro />} />
              <Route path="/Busqueda" element={<Busqueda />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
