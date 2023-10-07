import React from "react";
import { Link } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function Header() {
    return (
        <header className="header-container">
            <div className="welcome-text">
                <h1>
                    <Link to="/" className="navbar-container-link">
                        <AccountBoxIcon fontSize="big" /> Módulo Clientes
                    </Link>
                </h1>
            </div>
            <nav className="navbar-container">
                <div className="navbar-section">                        
                </div>
            </nav>
        </header>
    );
}