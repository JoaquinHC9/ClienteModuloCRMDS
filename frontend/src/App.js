import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Registro from "./pages/Registro";
import Main from "./pages/Main";
import { Helmet } from "react-helmet";
import Busqueda from "./pages/Busqueda";
import PerfilCliente from "./pages/PerfilCliente";
import GestionLinea from "./pages/GestionLinea";
import PerfilLinea from "./pages/PerfilLinea.js";
import DarDeBaja from "./pages/DarDeBaja.js";
import Transferencia from "./pages/TransferenciaLinea.js";
import EstadoCuentaGen from "./pages/EstadoCuentaGen.js";
import Login from "./pages/Login.js";

const SidebarLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

function App() {
  return (
    <div className="App">
      <Router>
        <Helmet>
          <title>Modulo Clientes</title>
        </Helmet>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<SidebarLayout />}>
            <Route path="/Main" element={<Main />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/Busqueda" element={<Busqueda />} />
            <Route path="/Perfil/:dni" element={<PerfilCliente />} />
            <Route path="/Lineas/:dni" element={<GestionLinea />} />
            <Route path="/PerfilLinea/:numTelefono" element={<PerfilLinea />} />
            <Route path="/DarDeBaja/:numTelefono" element={<DarDeBaja />} />
            <Route path="/Transferencia/:numTelefono" element={<Transferencia />} />
            <Route path="/EstadoCuenta/:dni" element={<EstadoCuentaGen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
