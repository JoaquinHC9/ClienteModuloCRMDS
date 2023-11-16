import React from 'react';
import { useParams } from 'react-router-dom';
import './Perfil.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAxios } from '../components/UseAxios.ts'; 
import { API_URL,VENTAS_URL } from '../config';

function PerfilLinea() {
  const { numTelefono } = useParams();
  const { data: lineaData, error: lineaError, isLoading: lineaIsLoading } = useAxios(`${VENTAS_URL}/lineas/obtenerDetallesDeLinea/${numTelefono}`);

  // Verificar si `lineaData` es un array y tiene al menos un elemento
  const hasLineaData = Array.isArray(lineaData) && lineaData.length > 0;  
  return (
    <div className="container">
      <div className="contenedor-icono">
        <AccountCircleIcon fontSize="100" className="icono-perfil" />
      </div>
      <h1>Perfil de la Línea</h1>

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
              <p>Estado: {linea.estado === 0 ? 'Activo' : 'No activo'}</p>
            </div>
          ))}
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