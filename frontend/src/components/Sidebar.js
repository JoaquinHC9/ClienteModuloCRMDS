import React, { useState } from 'react';
import "./SideBar.css";
import { SidebarData } from './SidebarData';
import MenuIcon from '@mui/icons-material/Menu';

export default function Sidebar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={`Sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <MenuIcon />
      </div>
      {isSidebarExpanded && (
        <ul className='SidebarList'>
          {SidebarData.map((val, key) => (
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link
              }}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
