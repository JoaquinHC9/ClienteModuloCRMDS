import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button,Box, MenuItem, TextField, TextareaAutosize } from '@mui/material';
import { useAxios } from '../components/UseAxios.ts'; 
import { API_URL } from '../config';
import './Baja.css';

function DarDeBaja() {
  const { numTelefono } = useParams();
  const { data: lineaData, error: lineaError, isLoading: lineaIsLoading } = useAxios(`${API_URL}/lineas/obtenerDetallesDeLinea/${numTelefono}`);
  const [motivo, setMotivo] = useState('');
  const [otroMotivo, setOtroMotivo] = useState('');

  // Verificar si `lineaData` es un array y tiene al menos un elemento
  const hasLineaData = Array.isArray(lineaData) && lineaData.length > 0;  

  const handleMotivoChange = (e) => {
    const selectedMotivo = e.target.value;
    setMotivo(selectedMotivo);

    // Si el motivo seleccionado no es 'otro', limpia el campo de texto 'otroMotivo'
    if (selectedMotivo !== 'otro') {
      setOtroMotivo('');
    }
  };

  const handleConfirmar = () => {
    // Agregar lógica de confirmación aquí
    console.log('Confirmado');
  };
  
  const handleCancelar = () => {
    // Agregar lógica de cancelación aquí
    console.log('Cancelado');
  };

  return (
    <div className='contenedor-principal'>        
      <div className="contenedor">
        <div className="cascada">
          <h1>Estado Linea</h1>
          {hasLineaData ? (
        <div>
        {lineaData.map((linea, index) => (
            <div key={index}>
            <h2>Línea</h2>
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
      </div>
      <div className="contenedor">
        <div className="cascada">
          <h1>Ultimo Recibo</h1> 
        </div>
      </div>
      <div className="contenedor">
        <div className="cascada">
          <h1>Cancelacion Linea</h1>
          <div className='selector-contenedor'>
            <p>Tipo:</p>
            <Box width ='250px' marginTop='-16px'>
              <TextField label ='Seleccionar tipo de baja' select fullWidth>
                <MenuItem value="permanente">Permanente</MenuItem>
                <MenuItem value="temporal">Temporal</MenuItem>
              </TextField>
            </Box>
          </div>
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
                label="Digite DNI como confirmación"
                fullWidth
                // Añade lógica para manejar el valor del campo de confirmación si es necesario
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

export default DarDeBaja;
