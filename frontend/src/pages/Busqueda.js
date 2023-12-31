import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Menu, MenuItem, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';
import { VENTAS_URL,API_URL } from '../config';
import {useNavigate } from 'react-router-dom';
import ModificarCliente from './ModificarCliente'; 
import BusFachada from '../components/BusFachada.ts';
import ExcelExport from '../components/ExcelExport.js';
import '../styles/Busqueda.css';

export default function Busqueda() {

  //busquedas
  const [searchDNI, setSearchDNI] = useState('');
  const [searchNombre, setSearchNombre] = useState('');
  const [searchApellido, setSearchApellido] = useState('');
  //resultados
  const [searchResults, setSearchResults] = useState([]);
  //redireccion
  const navigate = useNavigate();  
  //seleccion
  const [selectedClient, setSelectedClient] = useState(null);
  //menu
  const [menuAnchorEl, setMenuAnchorEl] = useState({});
  //tablas
  const columns = ['DNI', 'Nombre', 'Apellido', 'Correo', 'Fecha Nacimiento','Fecha de Afiliacion','Departamento','Distrito','Sexo','Acciones'];
    
  // Manejo de edición del cliente
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const editCliente = (client) => {
    setEditingClient(client);
    setIsEditModalOpen(true);
  };
  const busFachada = BusFachada();
  //Manejo busqueda
  const searchHandle = async () => {
    try {
      if (searchDNI) {
        const clienteData = await busFachada.buscarClientePorDNI(searchDNI);
        setSearchResults([clienteData]);        
      } else if (searchNombre) {
        const clientesPorNombre = await busFachada.buscarClientesPorNombre(searchNombre);
        setSearchResults(clientesPorNombre);
      } else if (searchApellido) {
        const clientesPorApellido = await busFachada.buscarClientesPorApellido(searchApellido);
        setSearchResults(clientesPorApellido);
      }
      setSearchDNI('');
      setSearchNombre('');
      setSearchApellido('');
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }    
  }; 
  const listHandle = async () => {
    try {      
      const response = await busFachada.obtenerTodosLosClientes();
      setSearchResults(response);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };
  
  //abrir menu acciones
  const openProfile = (clientDNI, event) => {
    const selectedClient = searchResults.find((result) => result.dni === clientDNI);
    setSelectedClient(selectedClient);
    setMenuAnchorEl({ ...menuAnchorEl, [clientDNI]: event.currentTarget }); // Usar una variable por fila
  };
  //cerrar menu acciones
  const handleClose = (clientDNI) => {
    setMenuAnchorEl({ ...menuAnchorEl, [clientDNI]: null }); // Usar una variable por fila
  };

  const redirectToProfile = (dni) => {
    // Redirige a la página del perfil del cliente utilizando el DNI como parte de la URL
    navigate(`/perfil/${dni}`);
  };

  const redirectToGestionLineas = async (dni) => {
    // Redirige a la página que maneja líneas
    try {
        const response = await axios.get(`${VENTAS_URL}/getlineas/${dni}`);
        navigate(`/Lineas/${dni}`, { state: { client: selectedClient } });
    } catch (error) {
        console.error('Error al obtener las líneas del cliente:', error);
    }
};

  const redirectEstadoCuenta = (dni) => {
    navigate(`/EstadoCuenta/${dni}`);
  };

  return (
    <div>
      <Helmet>
          <title>Busqueda</title>
        </Helmet>        
      <div className='bus-principal'>
        <h2 className='text-black mb-4'>Busqueda de Clientes</h2>
        <h3 className='text-black mb-4' style={{ fontStyle: 'italic' }}>Digitar informacion relacionada a un cliente</h3>
        <div>        
          <div className='flex-container'>
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
          </div>          
          <div className='bus-tabla'>
          <button className='boton-busqueda' onClick={searchHandle}>
              Buscar
            </button>
            <button className='boton-listar' onClick={listHandle}>
              Mostrar todos los clientes
            </button>
            <ExcelExport data={searchResults} />
          <TableContainer component={Paper} className='resultado-busqueda'  >
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((resultado, index) => (
                  <TableRow key={index}>
                    <TableCell>{resultado.dni}</TableCell>
                    <TableCell>{resultado.nombre}</TableCell>
                    <TableCell>{resultado.apellido}</TableCell>
                    <TableCell>{resultado.correo}</TableCell>
                    <TableCell>{new Date(resultado.fechanac).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(resultado.fechaafili).toLocaleDateString()}</TableCell>
                    <TableCell>{resultado.departamento}</TableCell>
                    <TableCell>{resultado.distrito}</TableCell>
                    <TableCell>{resultado.sexo}</TableCell>
                    <TableCell>
                      <button
                        className='boton-perfil'
                        onClick={(event) => openProfile(resultado.dni, event)}
                      >
                        ...
                      </button>
                      <div className='menu'>
                        <Menu
                          anchorEl={menuAnchorEl[resultado.dni]}
                          open={Boolean(menuAnchorEl[resultado.dni])}
                          onClose={() => handleClose(resultado.dni)}
                        >
                          <MenuItem onClick={() => redirectToProfile(resultado.dni)}>Visualizar Perfil</MenuItem>
                          <MenuItem onClick={() => editCliente(resultado)}>Editar detalles del cliente</MenuItem>
                          <MenuItem onClick={() => redirectToGestionLineas(resultado.dni)}>Gestion de Lineas</MenuItem>
                          <MenuItem onClick={() => redirectEstadoCuenta(resultado.dni)}>Estado de Cuenta</MenuItem>
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
      {isEditModalOpen && (
        <ModificarCliente
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          client={editingClient}
        />
      )}
    </div>
  );
}