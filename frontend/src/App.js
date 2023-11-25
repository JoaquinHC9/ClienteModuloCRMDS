import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Registro from "./pages/Registro";
import Main from "./pages/Main";
import { Helmet } from "react-helmet";
import Busqueda from "./pages/Busqueda";
import PerfilCliente from "./pages/PerfilCliente";
import GestionLinea from "./pages/GestionLinea";
import PerfilLinea from "./pages/PerfilLinea.js";
import ActLinea from "./pages/ActLinea.js";
import Transferencia from "./pages/TransferenciaLinea.js";
import EstadoCuentaGen from "./pages/EstadoCuentaGen.js";
import Login from "./pages/Login.js";
import AccesoDenegado from "./pages/AccesoDenegado.js";

const SidebarLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);


function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Error checking login status", error);
        } finally {
            setLoading(false);
        }
    };

    checkLoginStatus();
}, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return (
      <div className="App">
        <Router>
          <Helmet>
            <title>Modulo Clientes</title>
          </Helmet>
          <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />          
            {isLoggedIn ? (
              <Route path="/" element={<SidebarLayout />}>
                <Route path="/Main" element={<Main />} />
                <Route path="/Registro" element={<Registro />} />
                <Route path="/Busqueda" element={<Busqueda />} />
                <Route path="/Perfil/:dni" element={<PerfilCliente />} />
                <Route path="/Lineas/:dni" element={<GestionLinea />} />
                <Route path="/PerfilLinea/:numTelefono" element={<PerfilLinea />} />
                <Route path="/ActLinea/:numTelefono" element={<ActLinea />} />                
                <Route path="/Transferencia/:numTelefono" element={<Transferencia />} />
                <Route path="/EstadoCuenta/:dni" element={<EstadoCuentaGen />} />                
                <Route path="*" element={<Navigate to="/Main" />} />
              </Route>
            ) : (
              <Route path="*" element={<AccesoDenegado />} />
            )}
          </Routes>
        </Router>
      </div>
    );
  }
  if (!isLoggedIn) {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<AccesoDenegado />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
