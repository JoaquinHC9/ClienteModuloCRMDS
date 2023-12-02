import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios'; 
import { API_URL } from '../config';
import ModificarClienteCommand from '../components/ModificarClienteCommand.ts'; 
import '../styles/ModificarCliente.css'; 

export default function ModificarCliente({ isOpen, onClose, client: cliente }) {
  const [detallesCliente, setDetallesCliente] = useState(null);
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date(cliente.fechanac).toLocaleDateString());
  const [isEditMode, setIsEditMode] = useState(false);

  const [nuevosDetalles, setNuevosDetalles] = useState({
    dni: '',
    direccion: '',
    codigo_postal: '',
    trabajo: '',
    hobie: '',
    estado_civil: '',
    num_hijos: '',
    contac_externo: '',
  });

  useEffect(() => {
    const loadDetallesCliente = async (dni) => {
        try {
            const response = await axios.get(`${API_URL}/detallesCliente/buscarDetallesDNI/${dni}`);            
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
          setNuevosDetalles({
            dni: detallesCliente.dni || '',
            direccion: detallesCliente.direccion || '',
            codigo_postal: detallesCliente.codigo_postal || '',
            trabajo: detallesCliente.trabajo || '',
            hobie: detallesCliente.hobie || '',
            estado_civil: detallesCliente.estado_civil || '',
            num_hijos: detallesCliente.num_hijos || '',
            contac_externo: detallesCliente.contac_externo || '',
          });
      }
      setIsEditMode(!isEditMode);
  };

  const saveNuevosDetalles = async () => {
    try {      
      const modificarClienteCommand = new ModificarClienteCommand(cliente.dni, nuevosDetalles);
      const response = await modificarClienteCommand.execute();
      setDetallesCliente(response);
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
    { label: "Codigo Postal", field: "codigo_postal" },
    { label: "Trabajo", field: "trabajo" },
    { label: "Hobbie", field: "hobie" },
    { label: "Estado Civil", field: "estado_civil" },
    { label: "Numero de Hijos", field: "num_hijos" },
    { label: "Contacto Externo", field: "contac_externo" },
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