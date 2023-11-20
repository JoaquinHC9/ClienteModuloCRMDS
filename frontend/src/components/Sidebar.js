import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';
import { SidebarData } from './SidebarData';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar la existencia del token de autenticación en localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleLogout = () => {
    // Limpiar datos de localStorage al cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('correo');
    setIsLoggedIn(false);
    // Redirigir a la página principal después de cerrar sesión
    navigate('/');
  };

  return (
    <div className={`Sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <MenuIcon />
      </div>
      {isSidebarExpanded && (
        <ul className="SidebarList">
          {SidebarData.map((val, key) => (
            // Mostrar solo elementos autorizados si el usuario está autenticado
            (isLoggedIn || !val.requiresAuth) && (
              <li
                key={key}
                className="row"
                id={window.location.pathname === val.link ? 'active' : ''}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            )
          ))}
          {isLoggedIn && (
            <li className="row" onClick={handleLogout}>
              <div id="icon">{<LogoutIcon />}</div>
              <div id="title">Cerrar Sesión</div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}