import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button,Box, MenuItem, TextField, TextareaAutosize } from '@mui/material';
import { useAxios } from '../components/UseAxios.ts'; 
import { API_URL,VENTAS_URL } from '../config.js';
import { Helmet } from 'react-helmet';
import EstadoLinea from './EstadosLinea.js';
import axios from 'axios';
import '../styles/Baja.css';

function ActLinea() {
  const { numTelefono } = useParams();
  const { data: lineaData, error: lineaError, isLoading: lineaIsLoading } = useAxios(`${VENTAS_URL}/searchlinea/${numTelefono}`);
  const dni = lineaData?.dni_cliente;
  const { data: reciboData, error: reciboError, isLoading: reciboIsLoading } = useAxios(`${VENTAS_URL}/searchbillnumber/${numTelefono}`);  
  const { data: clienteData, error: clienteError, isLoading: clienteLoading } = useAxios(`${API_URL}/clientes/buscarPorDNI/${dni}`);
  const hasClienteData = clienteData && Object.keys(clienteData).length > 0;
  const [motivo, setMotivo] = useState('');
  const [otroMotivo, setOtroMotivo] = useState('');

  // Verificar si `lineaData` es un array y tiene al menos un elemento
  const hasLineaData = lineaData && Object.keys(lineaData).length > 0;  
  // Estado para el DNI del propietario actual al confirmar
  const [dniConfirmacion, setDniConfirmacion] = useState('');
  
  const [tipoBaja, setTipoBaja] = useState('');

  const handleMotivoChange = (e) => {
    const selectedMotivo = e.target.value;
    setMotivo(selectedMotivo);

    // Si el motivo seleccionado no es 'otro', limpia el campo de texto 'otroMotivo'
    if (selectedMotivo !== 'otro') {
      setOtroMotivo('');
    }
  };

  const handleConfirmar = async () => {
    try {
      if (!dniConfirmacion) {
        alert("Ingrese el DNI del propietario.");
        return;
      }
  
      if (dniConfirmacion !== dni) {
        alert("El DNI de confirmación no coincide con el propietario original.");
        return;
      }
  
      let endpoint = '';
  
      if (tipoBaja === 'temporal') {
        endpoint = '/suspenderlinea';
      } else if (tipoBaja === 'reactivar') {
        endpoint = '/reactivarlinea'; // Cambia al endpoint para reactivar
      } else {
        endpoint = '/cancelarlinea';
      }      
      const response = await axios.put(`${VENTAS_URL}${endpoint}/${lineaData.numero}`);
  
      if (response.status === 200) {
        alert("Operación confirmada con éxito.");
        // Puedes realizar alguna acción adicional después de la confirmación
      } else {
        alert("Error al confirmar la operación. Código de estado: " + response.status);
      }
    } catch (error) {
      alert("Error al confirmar la operación:", error);
    }
  };  
  
  const handleCancelar = () => {
    // Agregar lógica de cancelación aquí
    console.log('Cancelado');
  };
  return (
    <div className='baja-contenedor-principal'>
      <Helmet>
        <title>Actualizar Estado</title>
      </Helmet>
      <div className='baja-info'>
        <div className="baja-contenedor">
          <div className="cascada">
            <h1>Estado Linea</h1>
            {hasLineaData ? (
              <div>
                <div>
                  <h2>Linea</h2>
                  <p>Número de Teléfono: {lineaData.numero}</p>
                  <p>Plan: {lineaData.plan}</p>
                  <p>Fecha de Compra: {new Date(lineaData.fecha_compra).toLocaleDateString()}</p>
                  <p>Fecha de Pago: {new Date(lineaData.fecha_pago).toLocaleDateString()}</p>
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
        </div>
        <div className="baja-contenedor">
          <div className="cascada">
            <h1>Último Recibo</h1>
            {reciboData ? (
              reciboData.length > 0 ? (
                <div>
                  <p>Cliente: {hasClienteData ? `${clienteData.nombre} ${clienteData.apellido}` : 'Cliente no encontrado'}</p>
                  <p>DNI Cliente: {hasClienteData ? `${clienteData.dni}` : 'Cliente no encontrado'}</p>
                  <p>Fecha del Último Recibo: {new Date(reciboData[reciboData.length - 1].fecha_pago).toLocaleDateString()}</p>
                  <p>Monto: ${reciboData[reciboData.length - 1].precio}</p>
                  <p>Estado: {reciboData[reciboData.length - 1].estado}</p>
                  <div className='comparativo'>
                    <h2>Comparativo</h2>
                    <p>Monto Actual: ${reciboData[reciboData.length - 1].precio}</p>
                  </div>
                </div>
              ) : (
                <p>No se encuentran recibos para este número.</p>
              )
            ) : reciboIsLoading ? (
              <p>Cargando...</p>
            ) : (
              <p>Error: {reciboError}</p>
            )}
          </div>
        </div>
      </div>
      <div className="darbaja-contenedor">
        <div className="cascada">
          <h1>Actualizar Estado</h1>
          <div className='selector-contenedor'>
            <p>Tipo:</p>
            <Box width ='250px' marginTop='-16px'>
              <TextField
                label="Seleccionar tipo de baja"
                select
                fullWidth
                onChange={(e) => setTipoBaja(e.target.value)}
              >
                <MenuItem value="permanente">Permanente</MenuItem>
                <MenuItem value="temporal">Temporal</MenuItem>
                <MenuItem value="reactivar">Reactivar</MenuItem>
              </TextField>
            </Box>
          </div>          
          {tipoBaja !== 'reactivar' && (
            <div className='selector-contenedor'>
              <p>Motivo:</p>
              <Box width ='250px' marginTop='-16px'>
                <TextField
                  label ='Seleccionar motivo de baja'
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
          )}
          {motivo === 'otro' && (
            <div className='selector-contenedor' style={{ marginTop: '20px' }}>
              <p>Detalle del Motivo:</p>
              <Box width ='250px'>
                <TextareaAutosize
                  aria-label="Especificar Otro Motivo"
                  placeholder="Especificar Otro Motivo"
                  value={otroMotivo}
                  onChange={(e) => setOtroMotivo(e.target.value)}
                  style={{ resize: 'none', height: '250px' , width:'250px'}}
                />
              </Box>
            </div>
          )}
          <div className='selector-contenedor' style={{ marginTop: '20px' }}>
            <p>Confirmación:</p>
            <Box>
              <TextField
                label="Digite DNI del propietario si esta de acuerdo"
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
    </div>
  );
}  

export default ActLinea;
