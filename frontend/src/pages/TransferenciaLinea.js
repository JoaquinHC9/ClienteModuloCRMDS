import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from '../components/UseAxios.ts'; 
import { VENTAS_URL, API_URL } from '../config';
import { Modal, Button as Boton, Form } from 'react-bootstrap';
import { Button,Box, MenuItem, TextField, TextareaAutosize } from '@mui/material';
import { Helmet } from 'react-helmet';
import EstadoLinea from './EstadosLinea.js';
import '../styles/Transferencia.css';
import axios from 'axios';

function TransferenciaLinea() {
  //modal
  const [showModal, setShowModal] = useState(true);
  //parametro telefono
  const { numTelefono } = useParams();  

  //buscar dni por telefono
  const { data: lineaData, error: lineaError, isLoading: lineaIsLoading } = useAxios(`${VENTAS_URL}/searchlinea/${numTelefono}`);
  const dni = lineaData?.dni_cliente;  
  // Verificar si `lineaData` es un array y tiene al menos un elemento
  const hasLineaData = lineaData && Object.keys(lineaData).length > 0;
   
  //mostrar proppietario original
  const { data: clienteData, error: clienteError, isLoading: clienteIsLoading } = useAxios(`${API_URL}/clientes/buscarPorDNI/${dni}`);
  const hasClienteData = clienteData && Object.keys(clienteData).length > 0;
  //mostrar nuevo propietario
  const [nuevoPropDNI, setNuevoPropDNI] = useState('');
  const [nuevoProp, setNuevoProp] = useState(null);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleSearch = async () => {
    try {
      if (nuevoPropDNI && nuevoPropDNI !== dni) {
        const response = await axios.get(`${API_URL}/clientes/buscarPorDNI/${nuevoPropDNI}`);
        const nuevoProp = response.data;
        if (nuevoProp && Object.keys(nuevoProp).length > 0) {        
          setNuevoProp(nuevoProp);
          setShowModal(false);
        } else {
          alert("No se encontraron datos para el nuevo propietario.");
        }
      } else if (!nuevoPropDNI) {
        alert("Ingrese un DNI antes de realizar la búsqueda.");
      } else {
        alert("El DNI del nuevo propietario no puede ser igual al del propietario original.");
      }
    } catch (error) {
      alert("Error al realizar la búsqueda:", error);
    }    
  }
  
  // Estado para el motivo seleccionado
  const [motivo, setMotivo] = useState('');
  const [otroMotivo, setOtroMotivo] = useState('');
  // Estado para el DNI del propietario actual al confirmar
  const [dniConfirmacion, setDniConfirmacion] = useState('');

  // Función para manejar el cambio en el select de motivo
  const handleMotivoChange = (event) => {
    setMotivo(event.target.value);
  };

  // Función para manejar el cambio en el input de DNI de confirmación
  const handleDniConfirmacionChange = (event) => {
    setDniConfirmacion(event.target.value);
  };  

  const handleConfirmar = async () => {
    try {
      // Validar que se haya seleccionado un motivo
      if (!motivo) {
        alert("Seleccione un motivo de transferencia.");
        return;
      }
  
      // Validar el DNI de confirmación
      if (!dniConfirmacion) {
        alert("Ingrese el DNI del propietario original como confirmación.");
        return;
      }
  
      // Validar que se haya ingresado el DNI del nuevo propietario
      if (!nuevoPropDNI) {
        alert("Ingrese el DNI del nuevo propietario.");
        return;
      }
  
      // Realizar la confirmación solo si el DNI de confirmación coincide con el DNI del propietario original
      if (dniConfirmacion === dni) {        
        const dataToSend = {
          dni_cliente: nuevoPropDNI,
          numero: lineaData.numero,
        };
  
        // Realizar la solicitud PUT al nuevo endpoint del backend utilizando las constantes de URL
        const response = await axios.put(`${VENTAS_URL}/cambiolinea`, dataToSend);
  
        // Verificar el código de estado HTTP
        if (response.status === 200) {
          alert("Transferencia confirmada con éxito.");
          // Puedes realizar alguna acción adicional después de la confirmación
        } else {
          alert("Error al confirmar la transferencia. Código de estado: " + response.status);
        }
      } else {
        alert("El DNI de confirmación no coincide con el propietario original.");
      }
    } catch (error) {
      alert("Error al confirmar la transferencia: " + error.message);
    }
  };
  

  const handleCancelar = () => {
    // Lógica de cancelación aquí
  };

  return (
    <div className='contenedor-principal'>   
      <Helmet>
        <title>Transferencia</title>
      </Helmet>    
      <div className='contenedor-horizontal'>
      <Modal show={showModal} centered>
        <Modal.Header>
          <Modal.Title>Buscar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newOwnerDNIField">
              <Form.Label>Digite el DNI del nuevo propietario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el DNI"
                value={nuevoPropDNI}
                onChange={(e) => setNuevoPropDNI(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Boton variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Boton>
          <Boton variant="primary" onClick={handleSearch}>
            Buscar
          </Boton>          
        </Modal.Footer>
      </Modal>
      <div className="contenedor">
        {hasClienteData ? (
            <div>
              <h2>Datos del Propietario Original</h2>
              <p>Nombre: {clienteData.nombre}</p>
              <p>Apellido: {clienteData.apellido}</p>
              <p>Correo: {clienteData.correo}</p>
              <p>DNI: {clienteData.dni}</p>
              <p>Fecha de Nacimiento: {clienteData.fechanac && new Date(clienteData.fechanac).toLocaleDateString()}</p>
              <p>Distrito: {clienteData.distrito}</p>
              <p>Departamento: {clienteData.departamento}</p>
              <p>Sexo: {clienteData.sexo}</p>
            </div>
          ) : clienteIsLoading ? (
            <p>Cargando...</p>
          ) : (
            <p>Error al cargar datos del cliente: {clienteError}</p>
          )}
      </div>
      
      <div className="contenedor">      
        {hasLineaData ? (
          <div>
            <h2>Perfil de la Línea</h2>            
              <div>                
                <p>Número de Teléfono: {lineaData.numero}</p>
                <p>Plan: {lineaData.plan}</p>
                <p>Fecha de Compra: {new Date(lineaData.fecha_compra).toLocaleDateString()}</p>
                <p>Fecha de Pago: {new Date(lineaData.ultimo_pago).toLocaleDateString()}</p>
                <p>Monto Mensual: {lineaData.monto_pago}</p>
                <p>Estado: <EstadoLinea estado={lineaData.estado} /></p>
              </div>            
          </div>
        ) : lineaIsLoading ? (
          <p>Cargando...</p>
        ) : (
          <p>Error: {lineaError}</p>
        )}
      </div>
      <div className="contenedor">      
      {nuevoProp ? (
          <div>
            <h2>Datos del Nuevo Propietario</h2>
            <p>Nombre: {nuevoProp.nombre}</p>
            <p>Apellido: {nuevoProp.apellido}</p>
            <p>Correo: {nuevoProp.correo}</p>
            <p>DNI: {nuevoProp.dni}</p>
            <p>Fecha de Nacimiento: {nuevoProp.fechanac && new Date(nuevoProp.fechanac).toLocaleDateString()}</p>
            <p>Distrito: {nuevoProp.distrito}</p>
            <p>Departamento: {nuevoProp.departamento}</p>
            <p>Sexo: {nuevoProp.sexo}</p>
          </div>
        ) : null}
      </div>      
      </div>
      <div className="contenedor-transferencia">
        <h1>Transferencia</h1>
      <div className='selector-contenedor'>
          <p>Motivo:</p>
          <Box width='250px' marginTop='-16px'>
            <TextField
              label='Seleccionar motivo de transferencia'
              select
              fullWidth
              value={motivo}
              onChange={handleMotivoChange}
            >
              <MenuItem value="motivo1">Regalo a un familiar</MenuItem>
              <MenuItem value="motivo2">Familar ya es mayor de edad</MenuItem>
              <MenuItem value="motivo3">Regalo a un concido</MenuItem>              
              <MenuItem value="motivo4">Muchas lineas asociadas al propietario original</MenuItem>
              <MenuItem value="otro">Otro Motivo</MenuItem>
            </TextField>
          </Box>
        </div>
        {motivo === 'otro' && (
          <div className='selector-contenedor' style={{ marginTop: '20px' }}>
            <p>Detalle del Motivo:</p>
            <Box width='250px'>
              <TextareaAutosize
                aria-label="Especificar Otro Motivo"
                placeholder="Especificar Otro Motivo"
                value={otroMotivo}
                onChange={(e) => setOtroMotivo(e.target.value)}
                style={{ resize: 'none', height: '250px', width: '250px' }}
              />
            </Box>
          </div>
        )}
        <div className='selector-contenedor' style={{ marginTop: '20px' }}>
          <p>Confirmación:</p>
          <Box marginTop='-16px'>
            <TextField
              label="Digite DNI del antiguo propietario como confirmación"
              fullWidth
              value={dniConfirmacion}
              onChange={(e) => setDniConfirmacion(e.target.value)}
            />
          </Box>
        </div>
        <div className='selector-contenedor' style={{ marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleConfirmar}>
            Confirmar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancelar}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TransferenciaLinea;