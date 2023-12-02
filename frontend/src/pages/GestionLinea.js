import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Menu, MenuItem, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { API_URL,VENTAS_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import '../App.css';
import EstadoLinea from './EstadosLinea';

export default function GestionLineas() {
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteApellido, setClienteApellido] = useState('');

  const columnasDatosLinea = ['Numero de Telefono', 'Plan', 'Fecha de Compra','Ultimo de Pago','Monto Mensual', 'Estado','Acciones'];
  const { dni } = useParams();
  
  const [menuAnchorEl, setMenuAnchorEl] = useState({});

  const openOptions = (lineId, event) => {
    setMenuAnchorEl({ ...menuAnchorEl, [lineId]: event.currentTarget });
  };
  
  const handleClose = (lineId) => {
    setMenuAnchorEl({ ...menuAnchorEl, [lineId]: null });
  };

  const perfilLinea = (numTelefono) => {
    // Redirige a la página de detalles de la línea utilizando el número de teléfono
    navigate(`/PerfilLinea/${numTelefono}`);
  };

  const ActLinea = (numTelefono) => {
    navigate(`/ActLinea/${numTelefono}`);
  };

  const transferirLinea = (numTelefono) => {
    navigate(`/Transferencia/${numTelefono}`);
  };

  useEffect(() => {
    const fetchLines = async () => {
      try {
        const clienteResponse = await axios.get(`${API_URL}/clientes/buscarPorDNI/${dni}`);
        const cliente = clienteResponse.data;
        setClienteNombre(cliente.nombre); 
        setClienteApellido(cliente.apellido);
        const lineaRespuesta = await axios.get(`${VENTAS_URL}/getlineas/${dni}`);        
        setSearchResults(lineaRespuesta.data);
        console.log(lineaRespuesta.data)
      } catch (error) {
        console.error('Error al obtener las líneas del cliente:', error);
      }
    };
    fetchLines();
  }, [dni]);

  return (
    <div>
      <div className='formbusqueda'>
        <Helmet>
          <title>Gestión de Líneas</title>
        </Helmet>
        <div className='cotenedor'>
          <h2 className='text-black mb-4'>Lineas Asociadas</h2>
          <h2 className='text-black mb-4'>Cliente: {clienteNombre} {clienteApellido}</h2>
          <h3 className='text-black mb-4' style={{ fontStyle: 'italic' }}>
            Seleccione una acción relacionada a una línea
          </h3>
          <div className='tabla'>
            <TableContainer component={Paper} className='resultado-busqueda'>
              <Table>
                <TableHead>
                  <TableRow>
                    {columnasDatosLinea.map((column) => (
                      <TableCell key={column}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults ? (
                    searchResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>{result.numero}</TableCell>
                        <TableCell>{result.plan}</TableCell>
                        <TableCell>{new Date(result.fecha_compra).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(result.ultimo_pago).toLocaleDateString()}</TableCell>
                        <TableCell>{result.monto_pago}</TableCell>
                        <TableCell>
                          <EstadoLinea estado={result.estado} />
                        </TableCell>
                        <TableCell>
                          <button
                            className='boton-perfil'
                            onClick={(event) => openOptions(result.numero, event)}
                          >
                            ...
                          </button>
                          <div className='menu'>
                            <Menu
                              anchorEl={menuAnchorEl[result.numero]}
                              open={Boolean(menuAnchorEl[result.numero])}
                              onClose={() => handleClose(result.numero)}
                            >
                              <MenuItem onClick={() => perfilLinea(result.numero)}>Ver detalles de Línea</MenuItem>
                              <MenuItem onClick={() => ActLinea(result.numero)}>Actualizar Estado de Linea</MenuItem>                              
                              <MenuItem onClick={() => transferirLinea(result.numero)}>Transferencia</MenuItem>
                            </Menu>
                          </div>
                        </TableCell>
                      </TableRow>
                   ))
                   ) : (
                    <TableRow>
                    <TableCell colSpan={columnasDatosLinea.length}>No se encontraron líneas asociadas.</TableCell>
                  </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
  
}
