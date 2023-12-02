import React from 'react';
import { useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAxios } from '../components/UseAxios.ts'; 
import { VENTAS_URL } from '../config';
import '../styles/PerfilLinea.css';
import EstadoLinea from './EstadosLinea.js';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

function PerfilLinea() {
  const { numTelefono } = useParams();
  const { data: lineaData, error: lineaError, isLoading: lineaIsLoading } = useAxios(`${VENTAS_URL}/searchlinea/${numTelefono}`); 
  const hasLineaData = lineaData && Object.keys(lineaData).length > 0;  

  const getEstadoLabel = (estado) => {
    switch (estado) {
      case 0:
        return 'Servicio activo';
      case 1:
        return 'Servicio suspendido';
      case 2:
        return 'Servicio cancelado';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="linea-contenedor">
      <div className="contenedor-linea-ico">
        <PhoneAndroidIcon fontSize="100" className="icono-linea" />
      </div>
      <h1>Perfil de la Línea</h1>
      {hasLineaData ? (
        <div>                      
          <h2>Línea</h2>
          <p>Número de Teléfono: {lineaData.numero}</p>
          <p>Plan: {lineaData.plan}</p>
          <p>Fecha de Compra: {new Date(lineaData.fecha_compra).toLocaleDateString()}</p>
          <p>Fecha de Pago: {new Date(lineaData.fecha_pago).toLocaleDateString()}</p>
          <p>Monto Mensual: {lineaData.monto_pago}</p>
          <p>Estado: <EstadoLinea estado={lineaData.estado} /></p>
        </div>
      ) : lineaIsLoading ? (
        <p>Cargando...</p>
      ) : (
        <p>Error: {lineaError}</p>
      )}
    </div>
  );
}

export default PerfilLinea;
