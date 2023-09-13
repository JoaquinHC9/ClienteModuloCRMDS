import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className='bg-info'>
            <header className="header-container">
                <div className="welcome-text">
                    <h1><Link to="/" className="navbar-container-link">Módulo Clientes</Link></h1>
                </div>
                <nav className="navbar-container">
                    <div className="navbar-section">
                        <ul className="navbar-list">
                            <li><Link to="/Registro" className="navbar-container-link">Registro</Link></li>
                            <li><Link to="/RegistroCompleto" className="navbar-container-link">Registro Completo</Link></li>
                            <li><Link to="/Busqueda" className="navbar-container-link">Búsqueda</Link></li>
                            <li><Link to="/GestionLinea" className="navbar-container-link">Gestión de Línea</Link></li>
                            <li><Link to="/TransferenciaLinea" className="navbar-container-link">Transferencia de Línea</Link></li>
                            <li><Link to="/EstadoCuenta" className="navbar-container-link">Vistas de Estado de Cuenta</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
}

