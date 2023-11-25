import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAxios } from '../components/UseAxios.ts';
import { API_URL } from '../config.js';
import { Helmet } from 'react-helmet';
import './Perfil.css';

export default function PerfilCliente() {
  const { dni } = useParams();
  const { data: clienteData, error: clienteError, isLoading: clienteIsLoading } = useAxios(`${API_URL}/clientes/buscarPorDNI/${dni}`);
  const { data: clienteDetalladoData } = useAxios(`${API_URL}/detallesCliente/buscarClienteDetalladoPorDNI/${dni}`);
  const hasClienteData = clienteData && Object.keys(clienteData).length > 0;
  const hasClienteDetalladoData = clienteDetalladoData && Object.keys(clienteDetalladoData).length > 0;
  return (
    <div className="contenedor-perfil">
        <Helmet>
          <title>Perfil</title>
        </Helmet>
      <div className="contenedor-icono">
        <AccountCircleIcon fontSize="100" className="icono-perfil" />
      </div>
      <h1>Perfil del Cliente</h1>
      {hasClienteData ? (
          <div>
            <h2>Datos del Cliente</h2>
            <p>Nombre: {clienteData.nombre}</p>
            <p>Apellido: {clienteData.apellido}</p>
            <p>Correo: {clienteData.correo}</p>
            <p>DNI: {dni}</p>
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
        {hasClienteDetalladoData ? (
        <div>
          <h2>Datos Detallados del Cliente</h2>
          <p>Direccion: {clienteDetalladoData.direccion}</p>
          <p>Trabajo: {clienteDetalladoData.trabajo}</p>
          <p>Hobbie: {clienteDetalladoData.hobie}</p>
          <p>Estado Civil: {clienteDetalladoData.estado_civil}</p>
          <p>Código Postal: {clienteDetalladoData.codigo_postal}</p>
          <p>Contacto de Emergencia: {clienteDetalladoData.contac_externo}</p>
          <p>Numero de hijos: {clienteDetalladoData.num_hijos}</p>
        </div>
      ) : null}
    </div>
  );
}