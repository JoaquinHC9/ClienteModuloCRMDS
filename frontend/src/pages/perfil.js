import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Perfil.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAxios } from '../components/UseAxios.ts';
import { API_URL } from '../config';

function Perfil() {
  const { dni } = useParams();
  const { data: clienteData, error: clienteError, isLoading: clienteIsLoading } = useAxios(`${API_URL}/buscarPorDNI/${dni}`);
  const { data: clienteDetalladoData } = useAxios(`${API_URL}/buscarClienteDetalladoPorDNI/${dni}`);  
  const hasClienteData = clienteData && Object.keys(clienteData).length > 0;
  const hasClienteDetalladoData = clienteDetalladoData && Object.keys(clienteDetalladoData).length > 0;
  return (
    <div className="container">
      <div className="contenedor-icono">
        <AccountCircleIcon fontSize="100" className="icono-perfil" />
      </div>
      <h1>Perfil del Cliente</h1>
      {hasClienteData ? (
        <div>
            {clienteData.map((cliente, index) => (
              <div key={index}>
                <h2>Datos del Cliente</h2>
                <p>Nombre: {cliente.nombre}</p>
                <p>Apellido: {cliente.apellido}</p>
                <p>Correo: {cliente.correo}</p>
                <p>DNI: {dni}</p>
                <p>Fecha de Nacimiento: {cliente.fechanac && new Date(cliente.fechanac).toLocaleDateString()}</p>
                <p>Distrito: {cliente.distrito}</p>
                <p>Departamento: {cliente.departamento}</p>
                <p>Sexo: {cliente.sexo}</p>
              </div>
            ))}
          </div>
        ) : clienteIsLoading ? (
          <p>Cargando...</p>
        ) : (
          <p>Error al cargar datos del cliente: {clienteError}</p>
        )}
        {hasClienteDetalladoData ? (
          <div>
            {clienteDetalladoData.map((clienteDetallado, index) => (
              <div key={index}>
                <h2>Datos Detallados del Cliente</h2>
                <p>Trabajo: {clienteDetallado.trabajo}</p>
                <p>Hobbie: {clienteDetallado.hobie}</p>
                <p>Estado Civil: {clienteDetallado.estadocivil}</p>
                <p>Código Postal: {clienteDetallado.codigopostal}</p>
                <p>Contacto de Emergencia: {clienteDetallado.contacexterno}</p>
              </div>
            ))}
          </div>
        ) : null}
    </div>
  );
}
export default Perfil;