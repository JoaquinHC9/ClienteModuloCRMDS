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
import AppRqs from "./pages/rqsModulo/AppRqs.js"

export const AuthContext = React.createContext();

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
        const token = localStorage.getItem('token');
        if (token) {
          // Verificar si el token es válido (puedes hacer una llamada al servidor aquí)
          // Si es válido, establecer el estado como autenticado
          setIsLoggedIn(true);
        } else {
          // Si no hay token, o es inválido, establecer el estado como no autenticado
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status', error);
        // En caso de error, también establecer el estado como no autenticado
        setIsLoggedIn(false);
      } finally {
        // Independientemente del resultado, marcar la carga como completa
        setLoading(false);
      }
    };
  
    checkLoginStatus();
  }, []);
  


  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App">
      <Router>
        <Helmet>
          <title>Modulo Clientes</title>
        </Helmet>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/Main" />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          {isLoggedIn && (
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
                <Route path="/modulorqs/*" element={<AppRqs />}/>
                </Route>
          )}
          {!isLoggedIn && (
            <Route path="*" element={<AccesoDenegado />} />
          )}
        </Routes>
      </Router>
      </div>
      </AuthContext.Provider>
  );
}

export default App;