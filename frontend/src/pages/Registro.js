import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_URL } from "../config";
import axios from "axios";

export default function Registro() {
  const [data, setData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: null,
    distrito: '',
    departamento: '',
    fechaAfiliacion: new Date().toISOString().substr(0, 10), // Fecha actual en formato "YYYY-MM-DD"
    email: '',
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
      const url = `${API_URL}/registerAPI`;
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
          <button type='submit' className='btn btn-success'>Registrar</button>
        </form>
      </div>
    </div>
  );
}