import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Menu, MenuItem, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useParams } from 'react-router-dom'; // Importa el hook useParams

export default function GestionLineas() {
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteApellido, setClienteApellido] = useState('');

  const columnasDatosLinea = ['Numero de Telefono', 'Plan', 'Fecha de Compra','Fecha de Pago','Monto Mensual', 'Estado','Acciones'];
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

  const darDeBaja = (numTelefono) => {
    // Lógica para dar de baja la línea
    // Puedes realizar una solicitud a tu servidor para realizar esta acción
  };

  const transferirLinea = (numTelefono) => {
    // Lógica para transferir la línea
    // Puedes realizar una solicitud a tu servidor para realizar esta acción
  };

  useEffect(() => {
    const fetchLines = async () => {
      try {
        const clienteResponse = await axios.get(`${API_URL}/buscarPorDNI/${dni}`);
        const cliente = clienteResponse.data[0]; // Suponemos que obtiene un único cliente
        setClienteNombre(cliente.nombre); // Actualiza el estado con el nombre del cliente        
        setClienteApellido(cliente.apellido); // Actualiza el estado con el nombre del cliente

        const lineaRespuesta = await axios.get(`${API_URL}/buscarLineasPorDNI/${dni}`);
        setSearchResults(lineaRespuesta.data);
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
                  {searchResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.numerotelefono}</TableCell>
                      <TableCell>{result.plan}</TableCell>
                      <TableCell>{new Date(result.fechacompra).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(result.fechapago).toLocaleDateString()}</TableCell>
                      <TableCell>{result.montopagomensual}</TableCell>
                      <TableCell>{result.estado === 1 ? 'Activo' : 'No activo'}</TableCell>
                      <TableCell>
                        <button
                          className='boton-perfil'
                          onClick={(event) => openOptions(result.numerotelefono, event)}
                        >
                          ...
                        </button>
                        <div className='menu'>
                          <Menu
                            anchorEl={menuAnchorEl[result.numerotelefono]}
                            open={Boolean(menuAnchorEl[result.numerotelefono])}
                            onClose={() => handleClose(result.numerotelefono)}
                          >
                            <MenuItem onClick={() => perfilLinea(result.numerotelefono)}>Ver detalles de Línea</MenuItem>
                            <MenuItem onClick={() => darDeBaja(result.numerotelefono)}>Dar de baja</MenuItem>
                            <MenuItem onClick={() => transferirLinea(result.numerotelefono)}>Transferencia</MenuItem>
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
