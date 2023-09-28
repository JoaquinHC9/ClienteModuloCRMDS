import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import React from 'react';
import Header from './components/Header';
import Main from './pages/Main';
import Registro from './pages/Registro'
import RegistroCompleto from './pages/RegistroCompleto'
function App() {
  return (
    <div>      
      <BrowserRouter>
      <Header></Header>
      <Routes> 
        <Route path="/" element={<Main/>}/>
        <Route path="/Registro" element={<Registro/>}/>
        <Route path="/RegistroCompleto" element={<RegistroCompleto/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
