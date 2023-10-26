import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Menu, MenuItem, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../config';
import {useNavigate } from 'react-router-dom';
import '../App.css';

export default function Busqueda() {
  const [searchDNI, setSearchDNI] = useState('');
  const [searchNombre, setSearchNombre] = useState('');
  const [searchApellido, setSearchApellido] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const columns = ['DNI', 'Nombre', 'Apellido', 'Correo', 'Acciones'];

  const searchHandle = async () => {
    try {
      let searchField = '';
      let searchValue = '';
      if (searchDNI) {
        searchField = 'dni';
        searchValue = searchDNI;
      } else if (searchNombre) {
        searchField = 'nombre';
        searchValue = searchNombre;
      } else if (searchApellido) {
        searchField = 'apellido';
        searchValue = searchApellido;
      }
      const url = `${API_URL}/buscarPor${searchField}/${searchValue}`;
      const response = await axios.get(url);
      setSearchResults(response.data);      
      setSearchDNI('');
      setSearchNombre('');
      setSearchApellido('');
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };
  
  const openProfile = (clientDNI, event) => {
    const selectedClient = searchResults.find((result) => result.dni === clientDNI);
    setSelectedClient(selectedClient);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectToProfile = (dni) => {
    // Redirige a la página del perfil del cliente utilizando el DNI como parte de la URL
    navigate(`/perfil/${dni}`);
  };

  const redirectToGestionLineas = async (dni) => {
    // Redirige a la página que maneja líneas
    try {
        const response = await axios.get(`${API_URL}/buscarLineasPorDNI/${dni}`);
        navigate(`/Lineas/${dni}`, { state: { client: selectedClient } });
    } catch (error) {
        console.error('Error al obtener las líneas del cliente:', error);
    }
};


  const redirectAccountStatus = (dni) => {
    // Redirige a la página del perfil del cliente utilizando el DNI como parte de la URL    
  };

  return (
    <div>
      <div className='formbusqueda'>
        <Helmet>
          <title>Busqueda</title>
        </Helmet>
        <div className='cotenedor'>
          <h2 className='text-black mb-4'>Busqueda de Clientes</h2>
          <h3 className='text-black mb-4' style={{ fontStyle: 'italic' }}>Digitar informacion relacionada a un cliente</h3>
          <div className='search-container'>
            <span className='input-label'>DNI:</span>
            <input
              type='text'
              placeholder='DNI'
              className='caja-busqueda'
              value={searchDNI}
              onChange={(event) => setSearchDNI(event.target.value)}
            />
            <span className='input-label'>Nombre:</span>
            <input
              type='text'
              placeholder='Nombre'
              className='caja-busqueda'
              value={searchNombre}
              onChange={(event) => setSearchNombre(event.target.value)}
            />
            <span className='input-label'>Apellido:</span>
            <input
              type='text'
              placeholder='Apellido'
              className='caja-busqueda'
              value={searchApellido}
              onChange={(event) => setSearchApellido(event.target.value)}
            />
            <button className='boton-busqueda' onClick={searchHandle}>
              Buscar
            </button>
          </div>
          {/* Renderiza la tabla */}
          <div className='tabla'>
          <TableContainer component={Paper} className='resultado-busqueda'>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.dni}</TableCell>
                    <TableCell>{result.nombre}</TableCell>
                    <TableCell>{result.apellido}</TableCell>
                    <TableCell>{result.correo}</TableCell>
                    <TableCell>
                      <button
                        className='boton-perfil'
                        onClick={(event) => openProfile(result.dni, event)}
                      >
                        ...
                      </button>
                      <div className='menu'>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => redirectToProfile(result.dni)}>Visualizar Perfil</MenuItem>
                        <MenuItem onClick={() => redirectToGestionLineas(result.dni)}>Gestion de Lineas</MenuItem>
                        <MenuItem onClick={() => redirectAccountStatus(result.dni)}>Estado de Cuenta</MenuItem>
                      </Menu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}