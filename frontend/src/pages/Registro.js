import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_URL } from "../config";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';

export default function Registro() {
  const [data, setData] = useState({
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
  const [data2, setData2] = useState({
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
      const response = await axios.post(url, data);
      console.log(response);

      // Mostrar el modal después de completar el primer registro
      setShowModal(true);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };
  const enviarDatos2 = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/fullRegisterAPI`;
      const response = await axios.post(url, data2);
      console.log(response);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };
  const handleConfirm = () => {
    setShowModal(false);
    setShowSecondForm(true);
  };

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
    setShowSecondForm(false); // También asegúrate de ocultar el segundo formulario
    setShowModal(false); // Cierra el modal
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light">
      <Helmet>
        <title>Registro</title>
      </Helmet>
      <div className="bg-white p-3 rounded w-25">
        {!showSecondForm ? (
          <form onSubmit={enviarDatos}>
          <h2 className='text-black mb-4'>Registro</h2>
          <div className='mb-2'>
          <label htmlFor='dni'>
              <strong>DNI</strong>
            </label>
            <input type='text' placeholder='Digite DNI' onChange={onChange} required value={data.dni} name='dni' className='form-control rounded-0'></input>
            <br></br>
          </div>
          <div className='mb-3'>
            <label htmlFor='nombre'>
              <strong>Nombre</strong>
            </label>
            <input type='text' placeholder='Digite Nombre' onChange={onChange} required value={data.nombre} name='nombre' className='form-control rounded-0'></input>
            <br></br>
          </div>
          <div className='mb-3'>
            <label htmlFor='apellido'>
              <strong>Apellido</strong>
            </label>
            <input type='text' placeholder='Digite Apellido' onChange={onChange} required value={data.apellido} name='apellido' className='form-control rounded-0'></input>
            <br></br>
          </div>
          <div className='mb-3'>
            <label htmlFor='fechaNacimiento'>
              <strong>Fecha Nacimiento</strong>
            </label>
            <div className='date-picker-container'>
              <DatePicker
                selected={data.fechaNacimiento}
                onChange={(date) => setData({ ...data, fechaNacimiento: date })}
                placeholderText='Digite o seleccione su cumpleaños'
                className='form-control rounded-0'
                dateFormat='dd/MM/yy'
              />
              <br></br>
            </div>
            <label htmlFor='Distrito'>
              <strong>Distrito</strong>
            </label>
            <div>
              <input type="text" placeholder='Digite Distrito' onChange={onChange} required value={data.distrito} name='distrito' className='form-control rounded-0'></input>
              <br></br>
            </div>
            <label htmlFor='Departamento'>
              <strong>Departamento</strong>
            </label>
            <div>
              <input type="text" placeholder='Digite Departamento' onChange={onChange} required value={data.departamento} name='departamento' className='form-control rounded-0'></input>
              <br></br>
            </div>
            <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input type='email' placeholder='Digite correo' onChange={onChange} required value={data.email} name='email' className='form-control rounded-0'></input>
            <br></br>
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='sexo'>
              <strong>Sexo</strong>
            </label>
            <input type='text' placeholder='Digite sexo' onChange={onChange} required value={data.sexo} name='sexo' className='form-control rounded-0'></input>
            <br></br>
          </div>
          <button type='submit' className='btn btn-success'>Registrar</button>
          </form>
        ) : (
          <form onSubmit={enviarDatos2}>
            <h2 className='text-black mb-4'>Registro Completo</h2>
            <div className='mb-2'>
              <label htmlFor='direccion'>
                <strong>Dirección</strong>
              </label>
              <input type='text' placeholder='Digite Dirección' onChange={onChange2} required value={data.direccion} name='direccion' className='form-control rounded-0' />
              <br></br>
            </div>
            <div className='mb-3'>
              <label htmlFor='codigoPostal'>
                <strong>Código Postal</strong>
              </label>
              <input type='text' placeholder='Digite Código Postal' onChange={onChange2} required value={data.codigoPostal} name='codigoPostal' className='form-control rounded-0' />
              <br></br>
            </div>
            <div className='mb-3'>
              <label htmlFor='trabajo'>
                <strong>Trabajo</strong>
              </label>
              <input type='text' placeholder='Digite Trabajo' onChange={onChange2} required value={data.trabajo} name='trabajo' className='form-control rounded-0' />
              <br></br>
            </div>
            <div className='mb-3'>
              <label htmlFor='hobbie'>
                <strong>Hobbie</strong>
              </label>
              <div>
                <input type="text" placeholder='Digite Hobbie' onChange={onChange2} required value={data.hobbie} name='hobbie' className='form-control rounded-0' />
                <br></br>
              </div>
              <label htmlFor='estadoCivil'>
                <strong>Estado Civil</strong>
              </label>
              <div>
                <input type="text" placeholder='Digite Estado Civil' onChange={onChange2} required value={data.estadoCivil} name='estadoCivil' className='form-control rounded-0' />
                <br></br>
              </div>
              <label htmlFor='numHijos'>
                <strong>Número de Hijos</strong>
              </label>
              <div>
                <input type="number" placeholder='Digite Número de Hijos' onChange={onChange2} required value={data.numHijos} name='numHijos' className='form-control rounded-0' />
                <br></br>
              </div>
              <div className='mb-3'>
                <label htmlFor='contactoEmergencia'>
                  <strong>Contacto de Emergencia</strong>
                </label>
                <input type='text' placeholder='Digite contacto de emergencia' onChange={onChange2} required value={data.contactoEmergencia} name='contactoEmergencia' className='form-control rounded-0' />
                <br></br>
              </div>
            </div>
            <button type='submit' className='btn btn-success'>Registrar</button>
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
        <Button variant="secondary" onClick={() => vaciarCampos()}>
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