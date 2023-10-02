import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Perfil.css';
import axios from 'axios';
import { API_URL } from '../config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Perfil() {
  const { dni } = useParams();
  const [cliente, setCliente] = useState(null);
  const [clienteDetallado, setClienteDetallado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Recuperar datos del cliente
        let searchField = 'dni';
        let searchValue = dni;
        const url = `${API_URL}/buscarPor${searchField}/${searchValue}`;
        const response = await axios.get(url);
        setCliente(response.data[0]); // Suponiendo que response.data[0] contiene los datos del cliente                  
        const urlClienteDetallado = `${API_URL}/buscarClienteDetalladoPorDNI/${dni}`;
        const responseClienteDetallado = await axios.get(urlClienteDetallado);
        setClienteDetallado(responseClienteDetallado.data[0]);                
      } catch (error) {
        console.error('Error al obtener los datos del cliente:', error);
      }
    };
  
    fetchData();
  }, [dni]);
  

  const datosCliente = [
    { label: 'Nombre', value: cliente ? cliente.nombre : '' },
    { label: 'Apellido', value: cliente ? cliente.apellido : '' },
    { label: 'Correo', value: cliente ? cliente.correo : '' },
    { label: 'DNI', value: dni },    
    { label: 'Fecha de Nacimiento', value: cliente ? new Date(cliente.fechanac).toLocaleDateString() : '' },
    { label: 'Distrito', value: cliente ? cliente.distrito : '' },
    { label: 'Departamento', value: cliente ? cliente.departamento : '' },
    { label: 'Sexo', value: cliente ? cliente.sexo : '' },    
    { label: 'Trabajo', value: clienteDetallado ? clienteDetallado.trabajo : '' },
    { label: 'Hobbie', value: clienteDetallado ? clienteDetallado.hobie: '' },
    { label: 'Estado Civil', value: clienteDetallado ? clienteDetallado.estadocivil : '' },
    { label: 'Código Postal', value: clienteDetallado ? clienteDetallado.codigopostal : '' },
    { label: 'Contancto Emergencia', value: clienteDetallado ? clienteDetallado.contacexterno: '' },    
  ];

  return (
    <div className="container">
      <div className="contenedor-icono">
        <AccountCircleIcon fontSize="100" className="icono-perfil" />
      </div>
      <h1>Perfil del Cliente</h1>

      {cliente && (
        <div>
          {datosCliente.map((dato, index) => (
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

export default Perfil;
