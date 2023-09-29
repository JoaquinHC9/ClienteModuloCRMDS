import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './pages/Main';
import Registro from './pages/Registro';
import RegistroCompleto from './pages/RegistroCompleto';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <div className="App-container">          
          <div className="App-content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/Registro" element={<Registro />} />
              <Route path="/RegistroCompleto" element={<RegistroCompleto />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
