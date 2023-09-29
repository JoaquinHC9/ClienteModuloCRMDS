import React from 'react';
import "../App.css";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
export const SidebarData= [
    {
        title: "Main",
        icon: <HomeIcon/>,
        link: "/"
    },
    {
        title: "Registro",
        icon: <PersonAddIcon/>,
        link: "/Registro"
    },
    {
        title: "Registro Completo",
        icon: <HowToRegIcon/>,
        link: "/RegistroCompleto"
    },
    {
        title: "Busqueda Cliente",
        icon: <SearchIcon/>,
        link: "/Busqueda"
    },
    {
        title: "Gestion de Linea",
        icon: <PhoneIcon/>,
        link: "/GestionLinea"
    },
    {
        title: "Transferencia de Linea",
        icon: <PhoneForwardedIcon/>,
        link: "/TransferenciaLinea"
    }
]
