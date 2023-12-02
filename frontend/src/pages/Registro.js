import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_URL } from "../config";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';

export default function Registro() {
  
  const [clienteData, setData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: null,
    distrito: '',
    departamento: '',
    email : '',
    fechaAfiliacion: new Date().toISOString().substr(0, 10),    
    sexo:''
  });
  const [clienteDetalleData, setData2] = useState({
    dni: '',
    direccion: '',
    codigo_postal: '',
    trabajo: '',
    hobie: '',
    estado_civil: '',
    num_hijos: 'null',
    contac_externo: '', 
  });

  const [showModal, setShowModal] = useState(false);
  const [showSecondForm, setShowSecondForm] = useState(false);

  const [error, setError] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onChange2 = (event) => {
    const { name, value } = event.target;
    setData2((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const enviarDatos = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/clientes/registarCliente`;
      const response = await axios.post(url, clienteData);
      // Mostrar el modal después de completar el primer registro
      setShowModal(true);
    } catch (error) {
      setError(error.response.data.message);      
    }


  };
  
  const enviarDatos2 = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/detallesCliente/agregarDetallesCliente`;
      clienteDetalleData.dni = clienteData.dni;
      const response = await axios.post(url, clienteDetalleData);      
      alert("Detalles de cliente Registrado existosamente")      
      setShowSecondForm(false);
      resetFields();
    } catch (error) {
      setError(error.response.data.message);      
    }
    
  };
  
  const handleConfirm = () => {
    setShowModal(false);
    if (showSecondForm) {
      // Actualiza el DNI en clienteDetalleData antes de mostrar el segundo formulario
      setData2((prevState) => ({
        ...prevState,
        dni: clienteData.dni,
      }));
    }
    setShowSecondForm(true);
  };

  const cancelarForm = () => {
    setShowSecondForm(false);
    setShowModal(false);
    resetFields();   
  };
  
  const resetFields = () => {
    setData({
      dni: '',
      nombre: '',
      apellido: '',
      fechaNacimiento: null,
      distrito: '',
      departamento: '',
      email: '',
      fechaAfiliacion: new Date().toISOString().substr(0, 10),
      sexo: ''
    });
    setData2({
      dni: '',
      direccion: '',
      codigo_postal: '',  
      trabajo: '',
      hobie: '',
      estado_civil: '',   
      num_hijos: 'null',   
      contac_externo: '',  
    });    
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light">
      <Helmet>
        <title>Registro</title>
      </Helmet>
      <div className="bg-white p-3 rounded w-50">
        {!showSecondForm ? (
          <form onSubmit={enviarDatos}>
          <h2 className='text-black mb-4'>Registro</h2>
          <h3 className='text-black mb-4' style={{ fontStyle: 'italic' }}>Informacion personal del Cliente</h3>
          <div className='mb-2 d-flex justify-content-between'>
            <div>
              <label htmlFor='email'>
                <strong>Email</strong>
              </label>
              <input type='email' placeholder='Digite correo' onChange={onChange} required value={clienteData.email} name='email' className='form-control rounded-0 'style={{ width: '300px' }}></input>
            </div>
            <div>
              <label htmlFor='dni'>
                <strong>DNI</strong>
              </label>
              <input
                type='text'
                placeholder='Digite DNI'
                onChange={onChange}
                maxLength={8} // Limita la longitud a 8 caracteres
                required
                value={clienteData.dni}
                name='dni'
                className='form-control rounded-0'
                style={{ width: '300px' }}
              />
            </div>
          </div>
          <div className='mb-2 d-flex justify-content-between'>
            <div>
              <label htmlFor='nombre'>
                <strong>Nombre</strong>
              </label>
              <input type='text' placeholder='Digite Nombre' onChange={onChange} required value={clienteData.nombre} name='nombre' className='form-control rounded-0' style={{ width: '300px' }}></input>
            </div>
            <div>
              <label htmlFor='apellido'>
                <strong>Apellido</strong>
              </label>
              <input type='text' placeholder='Digite Apellido' onChange={onChange} required value={clienteData.apellido} name='apellido' className='form-control rounded-0'style={{ width: '300px' }}></input>
            </div>
          </div>
          <div className='mb-2 d-flex justify-content-between'>
            <div>
              <label htmlFor='fechaNacimiento'>
                <strong>Fecha Nacimiento</strong>
              </label>
              <div className='date-picker-container' style={{ width: '300px' }}>
                <DatePicker
                  selected={clienteData.fechaNacimiento}
                  onChange={(date) => setData({ ...clienteData, fechaNacimiento: date })}
                  placeholderText='Digite o seleccione su cumpleaños'
                  className='form-control rounded-0'                  
                  dateFormat='dd/MM/yy'                  
                />
              </div>
            </div>
            <div>
              <label htmlFor='sexo'>
                <strong>Sexo</strong>
              </label>
              <select
                onChange={onChange}
                value={clienteData.sexo}
                name='sexo'
                className='form-control rounded-0'
                style={{ width: '300px' }}
                required
              >
                <option value=''>Seleccionar</option>
                <option value='M'>Masculino</option>
                <option value='F'>Femenino</option>
                <option value='N'>No definido</option>
              </select>
            </div>
          </div>
          <div className='mb-2 d-flex justify-content-between'>
            <div>
              <label htmlFor='departamento'>
                <strong>Departamento</strong>
              </label>
              <input type='text' placeholder='Digite Departamento' onChange={onChange} required value={clienteData.departamento} name='departamento' className='form-control rounded-0' style={{ width: '300px' }}></input>
            </div>
            <div>
              <label htmlFor='distrito'>
                <strong>Distrito</strong>
              </label>
              <input type='text' placeholder='Digite Distrito' onChange={onChange} required value={clienteData.distrito} name='distrito' className='form-control rounded-0' style={{ width: '300px' }}></input>
            </div>
          </div>
          <button type='submit' className='btn btn-success'>Registrar</button>
          </form>
        ) : (
          <form onSubmit={enviarDatos2}>
            <h2 className='text-black mb-4'>Registro Completo</h2>
            <h3 className='text-black mb-4' style={{ fontStyle: 'italic' }}>Informacion complementaria del Cliente</h3>
            <div className='mb-2 d-flex justify-content-between'>
              <div>
                <label htmlFor='direccion'>
                  <strong>Dirección</strong>
                </label>
                <input
                  type='text'
                  placeholder='Digite Dirección'
                  onChange={onChange2}
                  required
                  value={clienteDetalleData.direccion}
                  name='direccion'
                  className='form-control rounded-0'  
                  style={{ width: '300px' }}                
                />
              </div>
              <div>
                <label htmlFor='codigo_postal'>
                  <strong>Código Postal</strong>
                </label>
                <input
                  type='text'
                  placeholder='Digite Código Postal'
                  onChange={onChange2}
                  required
                  value={clienteDetalleData.codigo_postal}
                  name='codigo_postal'
                  className='form-control rounded-0'
                  style={{ width: '300px' }}
                />
              </div>
            </div>
            <div className='mb-2 d-flex justify-content-between'>
              <div>
                <label htmlFor='trabajo'>
                  <strong>Trabajo</strong>
                </label>
                <input
                  type='text'
                  placeholder='Digite Trabajo'
                  onChange={onChange2}
                  required
                  value={clienteDetalleData.trabajo}
                  name='trabajo'
                  className='form-control rounded-0'
                  style={{ width: '300px' }}
                />
              </div>
              <div>
                <label htmlFor='hobie'>
                  <strong>Hobie</strong>
                </label>
                <input
                  type='text'
                  placeholder='Digite Hobbie'
                  onChange={onChange2}
                  required
                  value={clienteDetalleData.hobie}
                  name='hobie'
                  className='form-control rounded-0'
                  style={{ width: '300px' }}
                />
              </div>
            </div>
            <div className='mb-2 d-flex justify-content-between'>
              <div>
                <label htmlFor='estado_civil'>
                  <strong>Estado Civil</strong>
                </label>
                <select
                  onChange={onChange2}
                  required
                  value={clienteDetalleData.estado_civil}
                  name='estado_civil'
                  className='form-control rounded-0'
                  style={{ width: '300px' }}
                >
                  <option value='S'>Soltero</option>
                  <option value='C'>Casado</option>
                  <option value='D'>Divorciado</option>
                  <option value='V'>Viudo</option>
                </select>
              </div>
              <div>
                <label htmlFor='num_hijos'>
                  <strong>Número de Hijos</strong>
                </label>
                <input
                  type='number'
                  placeholder='Digite Número de Hijos'
                  onChange={onChange2}
                  onKeyDown={(e) => {
                    // Verificar si la tecla presionada es un número o la tecla de retroceso
                    const isNumber = /[0-9]/.test(e.key);
                    const isBackspace = e.key === 'Backspace';
                    // Permitir la tecla solo si es un número o la tecla de retroceso
                    if (!isNumber && !isBackspace) {
                      e.preventDefault();
                    }
                  }}
                  required
                  value={clienteDetalleData.num_hijos}
                  name='num_hijos'
                  className='form-control rounded-0'
                  style={{ width: '300px' }}
                  min="0"
                />
              </div>
            </div>
            <div className='mb-2'>
              <label htmlFor='contac_externo'> 
                <strong>Contacto de Emergencia</strong>
              </label>
              <input
                type='text'
                placeholder='Digite contacto de emergencia'
                onChange={onChange2}
                required
                value={clienteDetalleData.contac_externo} 
                name='contac_externo' 
                className='form-control rounded-0'
                maxLength='9'  // Esto limita la longitud a 9 caracteres
              />
            </div>
            <button type='submit' className='btn btn-success'>
              Registrar
            </button>
          </form>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Desea completar el formulario completo?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => cancelarForm()}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Sí, completar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );  
}
