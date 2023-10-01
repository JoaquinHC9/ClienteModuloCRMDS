import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { TextField, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../config';
import '../App.css'; // Asegúrate de importar el archivo CSS

export default function Busqueda() {
  const [searchDNI, setSearchDNI] = useState('');
  const [searchNombre, setSearchNombre] = useState('');
  const [searchApellido, setSearchApellido] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const columns = ['DNI', 'Nombre', 'Apellido', 'Correo'];

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

      // Restablecer los valores de las cajas de búsqueda
      setSearchDNI('');
      setSearchNombre('');
      setSearchApellido('');
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  return (
    <div> 
      <div className='formbusqueda'>
        <Helmet>
          <title>Busqueda</title>
        </Helmet>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
