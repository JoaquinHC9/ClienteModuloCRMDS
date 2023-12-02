import React from 'react'
import '../estilosModulo.css';

import { useParams, Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import apiClientes from "../api/clientes"
import api from "../api/api"

const Solicitud = () => {

  const tiposDeSolicitud = [
    'Cero',
    'Cambio de Plan',  
    'Cancelacion de Servicio',  
    'Nuestro Servicio',  
    'Soporte Tecnico',  
    'Cambio de informacion personal',  
    'Descuentos y promociones',  
    'Informacion o consulta',  
    'Cambio de metodo de pago',
    'Otros']

  const obtenerTipoSolicitud = (id) => {
    switch (id) {
      case 1:
        return tiposDeSolicitud[1]
      case 2:
        return tiposDeSolicitud[2]
      case 3:
        return tiposDeSolicitud[3]
      case 4:
        return tiposDeSolicitud[4]
      case 5:
        return tiposDeSolicitud[5]
      case 6:
        return tiposDeSolicitud[6]
      case 7:
        return tiposDeSolicitud[7]
      case 8:
        return tiposDeSolicitud[8]
      case 9:
        return tiposDeSolicitud[9]
      default:
        return ""
    }
  }

  const { id } = useParams();
  //Variable
  //Raclamos
  const [users, setUsers] = useState([])
  const [datosRQS, setDatosRQS] = useState(null)
  const [rqsDetalle, setRqsDetalle] = useState(null)
  const [usuarioDetalle, setUsuarioDetalle] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)


    //Funciones GET para iniciallizar los arreglos
  // Funciones GET Reclamos
  useEffect(() => {
    const fetchSolicitud = async () => {
      try {
        const response = await api.get('/solicitudes');// Llamar API
        setDatosRQS(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          setError('Error not found');
        } else {
          console.log(`Error API: ${err.message}`);
          setError('Error desconocido');
        }
      }
    }
    fetchSolicitud();//LLAMAR A LA FUNCION
  }, [])

  useEffect(()=>{
    if(datosRQS && datosRQS.length > 0){
        setRqsDetalle(datosRQS.find(dato => (dato.id_solicitud).toString() === id))
    }
  }, [datosRQS])

  useEffect(()=>{
    console.log("Datos cargados:" ,datosRQS)
    if(datosRQS && datosRQS.length > 0 && id > 0){
      console.log("Condicoin", datosRQS[datosRQS.length-1].id_reclamo)
    }
  }, [datosRQS])

  useEffect(()=>{
    console.log("DEtalle solicitud cargado:" ,rqsDetalle)
  }, [rqsDetalle])

  useEffect(() => {
    if(rqsDetalle){
      //console.log("Reclamo no nulo") No nulo es {} "Objeto vacio "y Nulo es null
      
      const fetchCliente = async () => {
        try {
          //await new Promise(resolve => setTimeout(resolve, 2000));
          const response = await apiClientes.get(`/clientes/buscarPorDNI/${rqsDetalle.id_cliente}`);// Llamar API
          setUsuarioDetalle(response.data);
        } catch (err) {
          if (err.response) {
            // Not in the 200 response range 
            setError('Error not found');
            console.log("Error no en 200 ")
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            setError('Error desconocido');
            console.log(`Error: ${err.message}`);
          }
        }
      }
      fetchCliente()
    }
    

  }, [rqsDetalle]);


  
   const fetchClientes = async () => {
     try {
        setLoading(true)
       const response = await apiClientes.get('/clientes');// Llamar API
       setUsers(response.data);
     } catch (err) {
       if (err.response) {
         // Not in the 200 response range 
         console.log(err.response.data);
         console.log(err.response.status);
         console.log(err.response.headers);
       } else {
         console.log(`Error: ${err.message}`);
       }
     }
   }


  return (
        <div className='moduloModuloRQS'>
            
            <div className='principalModuloRQS'>
              <div className='contenidoCentral'>
                <h1>Solicitud</h1>
                <div>
                  {datosRQS?
                    <>
                      { (rqsDetalle !== undefined && rqsDetalle !== null)?
                          <div>
                            <div>
                              <div>
                                <h2>Informacion del Solicitud</h2>
                                  <div >
                                    <p>ID del Solicitud: {rqsDetalle ? rqsDetalle.id_solicitud : ""}</p>
                                  </div>
                                  <div>
                                    <p>Id del cliente: {rqsDetalle ? rqsDetalle.id_cliente : ""}</p>
                                  </div>
                                  <div >
                                    <p>Tipo de Solicitud: {rqsDetalle ? obtenerTipoSolicitud(rqsDetalle.id_tipo_solicitud) : ""}</p>
                                  </div>  
                                  <div >
                                    <p>Fecha de registro: {rqsDetalle ? rqsDetalle.fecha_solicitud : ""}</p>
                                  </div>
                                  <div >
                                    <p>Estado Solicitud: {rqsDetalle ? rqsDetalle.estado : ""}</p>
                                  </div>
                                  <div >
                                    <p>Detalle solicitud: {rqsDetalle ? rqsDetalle.detalle_solicitud : ""}</p>
                                  </div>
                                  <div >
                                    <p>Peticion del cliente: {rqsDetalle ? rqsDetalle.peticion_cliente : ""}</p>
                                  </div>
                              </div>
                              <div >
                                <h2>Informacion del Producto</h2>
                                  <div>
                                    <p>Tipo de bien contratado: {rqsDetalle ? rqsDetalle.tipo_bien_contratado : ""}</p>
                                  </div>
                                  <div>
                                    <p>Orden de compra: {rqsDetalle ? rqsDetalle.orden_compra : ""}</p>
                                  </div>
                                  <div>
                                    <p>Codigo de producto: {rqsDetalle ? rqsDetalle.codigo_producto : ""}</p>
                                  </div>
                              </div>
                              <div >
                                <h2>Datos del cliente</h2>
                                  <div>
                                    <p>DNI: {usuarioDetalle? usuarioDetalle.dni : ""}</p>
                                  </div>
                                  <div>
                                    <p>Nombre: {usuarioDetalle? usuarioDetalle.nombre : ""}</p>
                                  </div>
                                  <div>
                                    <p>Apellido: {usuarioDetalle? usuarioDetalle.apellido : ""}</p>
                                  </div>
                                  <div>
                                    <p>Departamento: {usuarioDetalle? usuarioDetalle.departamento : ""}</p>
                                  </div>
                                  <div>
                                    <p>Distrito: {usuarioDetalle? usuarioDetalle.distrito : ""}</p>
                                  </div>
                                  <div>
                                    <p>Correo: {usuarioDetalle? usuarioDetalle.correo : ""}</p>
                                  </div>
                                  <div>
                                    <p>Sexo: {usuarioDetalle? usuarioDetalle.sexo : ""}</p>
                                  </div>
                              </div>            
                              <div>
                                <h2>Resolución del rqsDetalle</h2>
                                  <div>
                                    <p>Forma de respuesta {rqsDetalle? rqsDetalle.forma_respuesta : ""}</p>
                                  </div>
                                  <div>
                                    <p>Fecha de respuesta: {rqsDetalle? rqsDetalle.fecha_respuesta : ""}</p>
                                  </div>
                                  <div>
                                    <p>Fecha limite: {rqsDetalle? rqsDetalle.fecha_limite : ""}</p>
                                  </div>
                                  <div>
                                    <p>Acciones tomadas: {rqsDetalle? rqsDetalle.acciones_tomadas : ""}</p>
                                  </div>
                              </div>            
                              <div className='botonDiv'>
                                <p><Link to='/modulorqs' className='botonRQS'>Regresar</Link></p>
                              </div>
                            </div>
                          </div>
                        :
                        <>
                          {rqsDetalle === undefined && <p>No encontrado</p>}
                          {rqsDetalle === null && <p>Cargando Informacion</p>}
                        </>
                      }
                    </>:
                    <>
                      {error === null?<p>Cargando Informacion</p>:<p>{error}</p> }
                    </>
                  }
                </div>
            </div> 
            </div> 
        </div>
  )
}

export default Solicitud