import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import {API_URL} from "./config"
import axios from "axios"

export default function Registro() {
    const[data,setData] =useState({
        nombre: '',
        apellido: '',
        email:'',
        contrasenia:'',
        dni:'',
    })
    
    const [error, setError] = useState("")

    const onChange = (event) => {
        const {name, value} = event.target
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const enviarDatos = async (e) => {
        e.preventDefault()
        try {            
            const url = `${API_URL}/registerAPI`
            const response = await axios.post(url, data)
            console.log(response)            
        } catch (error) {            
            setError(error.response.data.message)
            console.log(error)
        }
    }
    
    return (
        <div className='d-flex justify-content-center align-items-center bg-light vh-100'>
            <Helmet>
                <title>Registro</title>
            </Helmet>
            <div className='bg-white p-3 rounded w-25'>                              
                <form action="">
                <h2 className="text-black mb-4">Registro</h2>
                    <div className='mb-2'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type="email" placeholder="Digite correo" onChange={onChange} required value={data.email} name="email"  className='form-control rounded-0' ></input><br></br>                        
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='nombre'><strong>Nombre</strong></label>
                        <input type="nombre" placeholder="Digite Nombre" onChange={onChange} required value={data.nombre} name="nombre"  className='form-control rounded-0' ></input><br></br>                                                
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='apellido'><strong>Apellido</strong></label>
                        <input type="apellido" placeholder="Digite Apellido" onChange={onChange} required value={data.apellido} name="apellido"  className='form-control rounded-0' ></input><br></br>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='dni'><strong>DNI</strong></label>                        
                        <input type="dni" placeholder="Digite DNI" onChange={onChange} required value={data.dni} name="dni"  className='form-control rounded-0' ></input><br></br>
                    </div>
                    <button className='btn btn-success'>Registrar</button>
                </form>
            </div>
        </div>
    )
}