import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './ModificarCliente.css'; // Importa los estilos
import axios from 'axios'; // Asegúrate de importar axios
import { API_URL } from '../config';

export default function ModificarCliente({ isOpen, onClose, client: cliente }) {
  const [detallesCliente, setDetallesCliente] = useState(null);
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date(cliente.fechanac).toLocaleDateString());
  const [isEditMode, setIsEditMode] = useState(false);

  const [nuevosDetalles, setNuevosDetalles] = useState({
    dni: '',
    direccion: '',
    codigoPostal: '',
    trabajo: '',
    hobie: '',
    estadoCivil: '',
    numhijos: '',
    contacExterno: '',
  });

  useEffect(() => {
    const loadDetallesCliente = async (dni) => {
        try {
            const response = await axios.get(`${API_URL}/detallesCliente/buscarClienteDetalladoPorDNI/${dni}`);            
            setDetallesCliente(response.data);
        } catch (error) {
            handleEditError();
            console.error('Error al cargar los detalles del cliente:', error);
        }
    };

    if (isOpen) {
        loadDetallesCliente(cliente.dni);
    }
}, [isOpen, cliente.dni]);

  const handleEditError = () => {
    // Esta función maneja los errores
    alert("Hubo un error en la consulta de la base de datos");
  }

  const toggleEditMode = () => {
      if (!isEditMode) {
          // Copia los detalles existentes al estado de edición
          setNuevosDetalles({
            dni: detallesCliente.dni || '',
            direccion: detallesCliente.direccion || '',
            codigoPostal: detallesCliente.codigoPostal || '',
            trabajo: detallesCliente.trabajo || '',
            hobie: detallesCliente.hobie || '',
            estadoCivil: detallesCliente.estadocivil || '',
            numhijos: detallesCliente.numHijos || '',
            contacExterno: detallesCliente.contacexterno || '',
          });
      }
      setIsEditMode(!isEditMode);
  };

  const saveNuevosDetalles = async () => {
    try {
      console.log('Valores de nuevosDetalles:', nuevosDetalles);
  
      // Realiza una solicitud GET para verificar si existen detalles para el cliente
      const response = await axios.get(`${API_URL}/buscarClienteDetalladoPorDNI/${cliente.dni}`);
      console.log(response.data.dni);
      if (response.data.dni === undefined) {        
        await axios.post(`${API_URL}/agregarDetallesCliente`, {
          dni: cliente.dni,
          direccion: nuevosDetalles.direccion,
          codigoPostal: nuevosDetalles.codigopostal,
          trabajo: nuevosDetalles.trabajo,
          hobie: nuevosDetalles.hobie,
          estadoCivil: nuevosDetalles.estadocivil,
          numHijos: nuevosDetalles.numhijos,
          contacExterno: nuevosDetalles.contacexterno,
        });
        console.log("post");
      } else {        
        await axios.put(`${API_URL}/actualizarDetallesCliente/${cliente.dni}`, {
          dni: cliente.dni,
          direccion: nuevosDetalles.direccion,
          codigoPostal: nuevosDetalles.codigopostal,
          trabajo: nuevosDetalles.trabajo,
          hobie: nuevosDetalles.hobie,
          estadoCivil: nuevosDetalles.estadocivil,
          numHijos: nuevosDetalles.numhijos,
          contacExterno: nuevosDetalles.contacexterno,
        });
        console.log(nuevosDetalles.dni);
        console.log("direccion " + nuevosDetalles.direccion);
        console.log("codigo p " + nuevosDetalles.codigopostal);
        console.log("trabajo " + nuevosDetalles.trabajo);
        console.log("hobie " + nuevosDetalles.hobie);
        console.log("num hijos " + nuevosDetalles.numhijos);
        console.log( "contact e. " +nuevosDetalles.contacexterno);
      }
  
      setDetallesCliente(response.data);
      toggleEditMode(); // Sal del modo de edición después de guardar los detalles
    } catch (error) {
      handleEditError();
      console.error('Error al guardar los nuevos detalles del cliente:', error);
    }
  };
  

  if (!cliente) {
    handleEditError();
    return null;
  }

  const datosCliente = [
    { label: "Nombre", field: "nombre" },
    { label: "Apellido", field: "apellido" },
    { label: "Fecha Nacimiento", field: "fechanac" },
    { label: "Distrito", field: "distrito" },
    { label: "Departamento", field: "departamento" },
    { label: "Correo", field: "correo" },
    { label: "Sexo", field: "sexo" },
  ];

  const datosClienteCompleto = [
    { label: "Direccion", field: "direccion" },
    { label: "Codigo Postal", field: "codigopostal" },
    { label: "Trabajo", field: "trabajo" },
    { label: "Hobbie", field: "hobie" },
    { label: "Estado Civil", field: "estadocivil" },
    { label: "Numero de Hijos", field: "numhijos" },
    { label: "Contacto Externo", field: "contacexterno" },
  ];

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="modalContainer">
        <h2>Editar Cliente</h2>
        <div className="datosContainer">
          <div className='datosBasicos'>
            <h3>Datos del Cliente</h3>
            {datosCliente.map((fieldInfo, index) => (
              <div key={index}>
                <label>{fieldInfo.label}:</label>
                {fieldInfo.field === 'fechanac' ? (
                  <input type="text" value={fechaNacimiento} disabled={!isEditMode} />
                ) : (
                  <input type="text" value={cliente[fieldInfo.field]} disabled={!isEditMode} />
                )}
              </div>
            ))}
          </div>
          <div className='datosCompletos'>
            <h3>Datos detallados del Cliente</h3>
            {isEditMode ? (
              // Muestra los campos de entrada para agregar nuevos detalles
              datosClienteCompleto.map((fieldInfo, index) => (
                <div key={index}>
                  <label>{fieldInfo.label}:</label>
                  <input
                    type="text"
                    value={nuevosDetalles[fieldInfo.field]}
                    onChange={(e) =>
                      setNuevosDetalles({
                        ...nuevosDetalles,
                        [fieldInfo.field]: e.target.value,
                      })
                    }
                  />
                </div>
              ))
            ) : (
              // Muestra los detalles existentes
              datosClienteCompleto.map((fieldInfo, index) => (
                <div key={index}>
                  <label>{fieldInfo.label}:</label>
                  {detallesCliente ? (
                    <input type="text" value={detallesCliente[fieldInfo.field]} disabled={!isEditMode} />
                  ) : (
                    <p>Cargando detalles...</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        {isEditMode ? (
          <div className="botones">
            <button onClick={saveNuevosDetalles}>Guardar Detalles</button>
            <button onClick={toggleEditMode}>Cancelar</button>
          </div>
        ) : (
          <button onClick={toggleEditMode}>Editar Detalles</button>
        )}
      </Box>
    </Modal>
  );
}