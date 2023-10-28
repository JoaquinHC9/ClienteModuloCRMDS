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
    direccion: '',
    codigoPostal: '',
    trabajo: '',
    hobbie: '',
    estadoCivil: '',
    numHijos: 'null',    
    contactoEmergencia: '',
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
      const url = `${API_URL}/registerAPI`;
      const response = await axios.post(url, clienteData);
      console.log(response);

      // Mostrar el modal después de completar el primer registro
      setShowModal(true);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
    vaciarCampos();
  };
  const enviarDatos2 = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/fullRegisterAPI`;
      const response = await axios.post(url, clienteDetalleData);
      console.log(response);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
    vaciarCampos();
  };
  const handleConfirm = () => {
    setShowModal(false);
    setShowSecondForm(true);
  };  
  const cancelarForm = ()=>{
    setShowSecondForm(false);
    setShowModal(false); 
  }
  const vaciarCampos = () => {
    setData({
      dni: '',
      nombre: '',
      apellido: '',
      fechaNacimiento: null,
      distrito: '',
      departamento: '',
      email: '',
      fechaAfiliacion: new Date().toISOString().substr(0, 10),
      sexo: '',
    });
    setData2({
      direccion: '',
      codigoPostal: '',
      trabajo: '',
      hobbie: '',
      estadoCivil: '',
      numHijos: 'null',
      contactoEmergencia: '',
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
              <input type='text' placeholder='Digite DNI' onChange={onChange} required value={clienteData.dni} name='dni' className='form-control rounded-0' style={{ width: '300px' }}></input>
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
              <input type='text' placeholder='Digite sexo' onChange={onChange} required value={clienteData.sexo} name='sexo' className='form-control rounded-0' style={{ width: '300px' }}></input>
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
                  value={clienteData.direccion}
                  name='direccion'
                  className='form-control rounded-0'  
                  style={{ width: '300px' }}                
                />
              </div>
              <div>
                <label htmlFor='codigoPostal'>
                  <strong>Código Postal</strong>
                </label>
                <input
                  type='text'
                  placeholder='Digite Código Postal'
                  onChange={onChange2}
                  required
                  value={clienteData.codigoPostal}
                  name='codigoPostal'
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
                  value={clienteData.trabajo}
                  name='trabajo'
                  className='form-control rounded-0'
                  style={{ width: '300px' }}
                />
              </div>
              <div>
                <label htmlFor='hobbie'>
                  <strong>Hobbie</strong>
                </label>
                <input
                  type='text'
                  placeholder='Digite Hobbie'
                  onChange={onChange2}
                  required
                  value={clienteData.hobbie}
                  name='hobbie'
                  className='form-control rounded-0'
                  style={{ width: '300px' }}
                />
              </div>
            </div>
            <div className='mb-2 d-flex justify-content-between'>
              <div>
                <label htmlFor='estadoCivil'>
                  <strong>Estado Civil</strong>
                </label>
                <input
                  type='text'
                  placeholder='Digite Estado Civil'
                  onChange={onChange2}
                  required
                  value={clienteData.estadoCivil}
                  name='estadoCivil'
                  className='form-control rounded-0'
                  style={{ width: '300px' }}
                />
              </div>
              <div>
                <label htmlFor='numHijos'>
                  <strong>Número de Hijos</strong>
                </label>
                <input
                  type='number'
                  placeholder='Digite Número de Hijos'
                  onChange={onChange2}
                  required
                  value={clienteData.numHijos}
                  name='numHijos'
                  className='form-control rounded-0'
                  style={{ width: '300px' }}
                />
              </div>
            </div>
            <div className='mb-2'>
              <label htmlFor='contactoEmergencia'>
                <strong>Contacto de Emergencia</strong>
              </label>
              <input
                type='text'
                placeholder='Digite contacto de emergencia'
                onChange={onChange2}
                required
                value={clienteData.contactoEmergencia}
                name='contactoEmergencia'
                className='form-control rounded-0'
              />
            </div>
            <button type='submit' className='btn btn-success'>
              Registrar
            </button>
          </form>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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