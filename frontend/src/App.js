import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import React from 'react';
import Registro from './Registro';
import Header from './Header';
import Main from './Main.js';
function App() {
  return (
    <div>      
      <BrowserRouter>
      <Header></Header>
      <Routes> 
        <Route path="/" element={<Main/>}/>
        <Route path="/Registro" element={<Registro/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
