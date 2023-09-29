import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import 'react-datepicker/dist/react-datepicker.css';
import { API_URL } from "../config";
import axios from "axios";

export default function Registro() {
  const [data, setData] = useState({
    direccion: '',
    codigoPostal: '',
    trabajo: '',
    hobbie: '',
    estadoCivil: '',
    numHijos: 'null',    
    contactoEmergencia: '',
  });

  const [error, setError] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const enviarDatos = async (e) => {
    e.preventDefault();
    try {            
      const url = `${API_URL}/fullRegisterAPI`;
      const response = await axios.post(url, data);
      console.log(response);
    } catch (error) {            
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-light vh-100'>
      <Helmet>
        <title>Registro</title>
      </Helmet>
      <div className='bg-white p-3 rounded w-25'>
        <form onSubmit={enviarDatos}>
          <h2 className='text-black mb-4'>Registro Completo</h2>
          <div className='mb-2'>
            <label htmlFor='direccion'>
              <strong>Dirección</strong>
            </label>
            <input type='text' placeholder='Digite Dirección' onChange={onChange} required value={data.direccion} name='direccion' className='form-control rounded-0' />
            <br></br>
          </div>
          <div className='mb-3'>
            <label htmlFor='codigoPostal'>
              <strong>Código Postal</strong>
            </label>
            <input type='text' placeholder='Digite Código Postal' onChange={onChange} required value={data.codigoPostal} name='codigoPostal' className='form-control rounded-0' />
            <br></br>
          </div>
          <div className='mb-3'>
            <label htmlFor='trabajo'>
              <strong>Trabajo</strong>
            </label>
            <input type='text' placeholder='Digite Trabajo' onChange={onChange} required value={data.trabajo} name='trabajo' className='form-control rounded-0' />
            <br></br>
          </div>
          <div className='mb-3'>
            <label htmlFor='hobbie'>
              <strong>Hobbie</strong>
            </label>
            <div>
              <input type="text" placeholder='Digite Hobbie' onChange={onChange} required value={data.hobbie} name='hobbie' className='form-control rounded-0' />
              <br></br>
            </div>
            <label htmlFor='estadoCivil'>
              <strong>Estado Civil</strong>
            </label>
            <div>
              <input type="text" placeholder='Digite Estado Civil' onChange={onChange} required value={data.estadoCivil} name='estadoCivil' className='form-control rounded-0' />
              <br></br>
            </div>
            <label htmlFor='numHijos'>
              <strong>Número de Hijos</strong>
            </label>
            <div>
              <input type="number" placeholder='Digite Número de Hijos' onChange={onChange} required value={data.numHijos} name='numHijos' className='form-control rounded-0' />
              <br></br>
            </div>
            <div className='mb-3'>
              <label htmlFor='contactoEmergencia'>
                <strong>Contacto de Emergencia</strong>
              </label>
              <input type='text' placeholder='Digite contacto de emergencia' onChange={onChange} required value={data.contactoEmergencia} name='contactoEmergencia' className='form-control rounded-0' />
              <br></br>
            </div>
          </div>
          <button type='submit' className='btn btn-success'>Registrar</button>
        </form>
      </div>
    </div>
  );
}