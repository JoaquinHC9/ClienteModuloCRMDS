import React from 'react'
import '../estilosModulo.css';

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import apiClientes from "../api/clientes"
import api from "../api/api"

const Reclamo = () => {

  const tiposDeReclamo = [
    'Cero',
    'Otros' ,//3
    'Producto Errado y/o Caracteristic...' ,//3
    'Producto con falla de funcionamiento' ,//4
    'Producto no estregado o con retraso' ,  //2
    'Error precio' ,  //2
    'Producto con daño Fisico' ,  //4
    'Producto incompleto' ,  //3
    'Incumplimiento de Promocion' ,//2
    'Publicidad engañosa' , 
    'Problemas de facturación']//3

  const obtenerTipoReclamo = (id) => {
    switch (id) {
      case 1:
        return tiposDeReclamo[1]
      case 2:
        return tiposDeReclamo[2]
      case 3:
        return tiposDeReclamo[3]
      case 4:
        return tiposDeReclamo[4]
      case 5:
        return tiposDeReclamo[5]
      case 6:
        return tiposDeReclamo[6]
      case 7:
        return tiposDeReclamo[7]
      case 8:
        return tiposDeReclamo[8]
      case 9:
        return tiposDeReclamo[9]
      case 10:
        return tiposDeReclamo[10]
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
    const fetchReclamos = async () => {
      try {
        const response = await api.get('/reclamos');// Llamar API
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
    fetchReclamos();//LLAMAR A LA FUNCION
  }, [])

  useEffect(()=>{
    if(datosRQS && datosRQS.length > 0){
        setRqsDetalle(datosRQS.find(dato => (dato.id_reclamo).toString() === id))
    }
  }, [datosRQS])

  useEffect(()=>{
    console.log("Datos cargados:" ,datosRQS)
    if(datosRQS && datosRQS.length > 0 && id > 0){
      console.log("Condicoin", datosRQS[datosRQS.length-1].id_reclamo)
    }
  }, [datosRQS])

  useEffect(()=>{
    console.log("DEtalle recalmo cargado:" ,rqsDetalle)
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
                <h1>Reclamo</h1>
                <div>
                  {datosRQS?
                    <>
                      { (rqsDetalle !== undefined && rqsDetalle !== null)?
                          <div>
                            <div>
                              <div>
                                <h2>Informacion del Reclamo</h2>
                                  <div >
                                    <p>ID del Reclamo: {rqsDetalle ? rqsDetalle.id_reclamo : ""}</p>
                                  </div>
                                  <div>
                                    <p>Id del cliente: {rqsDetalle ? rqsDetalle.id_cliente : ""}</p>
                                  </div>
                                  <div >
                                    <p>Tipo de Reclamo: {rqsDetalle ? obtenerTipoReclamo(rqsDetalle.id_tipo_reclamo) : ""}</p>
                                  </div>
                                  <div >
                                    <p>Fecha de registro: {rqsDetalle ? rqsDetalle.fecha_reclamo : ""}</p>
                                  </div>
                                  <div >
                                    <p>Estado Reclamo: {rqsDetalle ? rqsDetalle.estado : ""}</p>
                                  </div>
                                  <div >
                                    <p>Detalle reclamo: {rqsDetalle ? rqsDetalle.detalle_reclamo : ""}</p>
                                  </div>
                                  <div >
                                    <p>Peticion del cliente: {rqsDetalle ? rqsDetalle.peticion_cliente : ""}</p>
                                  </div>
                                  <div >
                                    <p>Monto reclamado: {rqsDetalle ? rqsDetalle.monto_reclamado : ""}</p>
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
                                  <div>
                                    <p>Fecha de Compra: {rqsDetalle ? rqsDetalle.fecha_compra : ""}</p>
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

export default Reclamo