import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Perfil.css';
import axios from 'axios';
import { API_URL } from '../config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function PerfilLinea() {
  const { numTelefono } = useParams();
  const [lineaData, setLineaData] = useState(null);

  useEffect(() => {
    const fetchLineaData = async () => {
      try {
        const response = await axios.get(`${API_URL}/obtenerDetallesDeLinea/${numTelefono}`);
        setLineaData(response.data[0]);
      } catch (error) {
        console.error('Error al obtener los detalles de la línea:', error);
      }
    };

    fetchLineaData();
  }, [numTelefono]);

  const datosLinea = [
    { label: 'Número de Teléfono', value: lineaData ? lineaData.numerotelefono : '' },
    { label: 'Plan', value: lineaData ? lineaData.plan : '' },
    { label: 'Fecha de Compra', value: lineaData ? new Date(lineaData.fechacompra).toLocaleDateString() : '' },
    { label: 'Fecha de Pago', value: lineaData ? new Date(lineaData.fechapago).toLocaleDateString() : '' },
    { label: 'Monto Mensual', value: lineaData ? lineaData.montopagomensual : '' },
    { label: 'Estado', value: lineaData ? (lineaData.estado === 1 ? 'Activo' : 'No activo') : '' },
  ];

  return (
    <div className="container">
      <div className="contenedor-icono">
        <AccountCircleIcon fontSize="100" className="icono-perfil" />
      </div>
      <h1>Perfil de la Línea </h1>

      {lineaData && (
        <div>
          {datosLinea.map((dato, index) => (
            <div className="info-box" key={index}>
              <span className="info-label">{dato.label}:</span>
              <span className="info-value">{dato.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PerfilLinea;