import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Transferencia.css';
import { useAxios } from '../components/UseAxios.ts'; 
import { API_URL } from '../config';
import { Modal, Button as Boton, Form } from 'react-bootstrap';
import { Button,Box, MenuItem, TextField, TextareaAutosize } from '@mui/material';
import axios from 'axios';


function TransferenciaLinea() {
  //modal
  const [showModal, setShowModal] = useState(true);
  //parametro telefono
  const { numTelefono } = useParams();  

  //buscar dni por telefono
  const { data: lineaData, error: lineaError, isLoading: lineaIsLoading } = useAxios(`${API_URL}/lineas/obtenerDetallesDeLinea/${numTelefono}`);

  // Verificar si `lineaData` es un array y tiene al menos un elemento
  const hasLineaData = Array.isArray(lineaData) && lineaData.length > 0;  

  const { data: dniData, error: dniError, isLoading: dniLoading } = useAxios(`${API_URL}/lineas/dniPorNumeroTelefono/${numTelefono}`);
  const dni = dniData?.dni;
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

  const handleConfirmar = () => {
    // Lógica de confirmación aquí
  };

  const handleCancelar = () => {
    // Lógica de cancelación aquí
  };

  return (
    <div className='contenedor-principal'>           
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
          {/* Puedes agregar cualquier otro botón del modal que necesites */}
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
            {lineaData.map((linea, index) => (
              <div key={index}>                
                <p>Número de Teléfono: {linea.numerotelefono}</p>
                <p>Plan: {linea.plan}</p>
                <p>Fecha de Compra: {new Date(linea.fechacompra).toLocaleDateString()}</p>
                <p>Fecha de Pago: {new Date(linea.fechapago).toLocaleDateString()}</p>
                <p>Monto Mensual: {linea.montopagomensual}</p>
                <p>Estado: {linea.estado === 1 ? 'Activo' : 'No activo'}</p>
              </div>
            ))}
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
              <MenuItem value="motivo1">Cambio de proveedor</MenuItem>
              <MenuItem value="motivo2">Problemas de servicio</MenuItem>
              <MenuItem value="motivo3">Falta de uso</MenuItem>
              <MenuItem value="motivo4">Problemas económicos</MenuItem>
              <MenuItem value="motivo5">Pérdida o robo del dispositivo</MenuItem>
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
              label="Digite DNI como confirmación"
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