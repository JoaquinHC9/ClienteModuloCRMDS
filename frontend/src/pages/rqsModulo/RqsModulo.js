import React from 'react'
import './estilosModulo.css';

import Reclamos from './FeedBack/Reclamos';
import Solicitudes from './FeedBack/Solicitudes';

import { useState, useEffect } from 'react';

import apiClientes from "./api/clientes"
import api from "./api/api"

const RqsModulo = () => {
  //Variable
  //Raclamos
  const [users, setUsers] = useState([])
  const opcionesFeedback = ['Reclamo', 'Solicitud'];
  const opcionesEstado = ['Todos', 'Derivado', 'Resuelto'];
  const [tipoFeedBack, setTipoFeedBack] = useState()//R Q S
  const [estadoFeedBack, setEstadoFeedBack] = useState()
  const [datosR, setDatosR] = useState([])
  const [datosQ, setDatosQ] = useState([])
  const [datosS, setDatosS] = useState([])
  const [rqsSearchR, setRqsSearchR] = useState([])
  const [rqsSearchS, setRqsSearchS] = useState([])
  const [loadingRQS, setLoadingRQS] = useState()

  //Funcion para traer todos los reclamos, carga al inicio
    //Funciones GET para iniciallizar los arreglos
  // Funciones GET Reclamos

  useEffect(()=>{
    setTipoFeedBack("Reclamo")
    setEstadoFeedBack("Todos")
  }, [])
  
  useEffect(()=>{
    setLoadingRQS(true)
  }, [tipoFeedBack, estadoFeedBack])

  useEffect(()=>{
    console.log("Loading ", loadingRQS)
  }, [loadingRQS])

  useEffect(() => {
    const fetchReclamos = async () => {
      try {
        let response;
        // Simular tiempo de carga (2 segundos)

        // Simular la obtención de datos de la API
        // const response = await api.get('/datosReclamos'); // NO disponible
        // setReclamosClases(response.data);
        switch (tipoFeedBack) {
          case "Reclamo":
            response = await api.get('/reclamos/area/1')
            setDatosR(response.data)
            break;
          case "Queja":
            response = await api.get('/quejas')
            setDatosQ(response.data)
            break;
          case "Solicitud":
            response = await api.get('/solicitudes/area/1')
            setDatosS(response.data)
            break;
          default:
            break;
        }
                // Fin de la simulación de carga
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error API: ${err.message}`);
        }
      }
    }
    fetchReclamos();
    console.log("Trabajando con:", tipoFeedBack)
  }, [tipoFeedBack, estadoFeedBack])

  const filtrarR = (items) => {
    let filteredItems;

    if (estadoFeedBack === 'Todos') {
      filteredItems = items;
    } else if (estadoFeedBack === 'Derivado') {
      filteredItems = items.filter(item => item.id_estado === 0);
    } else if (estadoFeedBack === 'Resuelto') {
      filteredItems = items.filter(item => item.id_estado === 1);
    }
  
    return filteredItems;
  }

  const filtrarS = (items) => {
    let filteredItems;

    if (estadoFeedBack === 'Todos') {
      filteredItems = items;
    } else if (estadoFeedBack === 'Derivado') {
      filteredItems = items.filter(item => item.id_estado === 0);
    } else if (estadoFeedBack === 'Resuelto') {
      filteredItems = items.filter(item => item.id_estado === 1);
    }

  
    return filteredItems;
  }

  useEffect(()=>{
    setRqsSearchS(filtrarS(datosS))
    if(datosS !== undefined && datosS !== null && datosS.length !== 0){
      setRqsSearchR((filtrarR(datosS)).sort((a, b) => a.id_solicitud - b.id_solicitud))
      console.log("ordenacion")
    }
    console.log("Datos S",datosS)
  }, [datosS])
  
  useEffect(()=>{
    console.log("Datos Search S", rqsSearchS)
    if(rqsSearchS !== undefined && rqsSearchS !== null && rqsSearchR.length !== 0){
      setLoadingRQS(false)
    }
  }, [rqsSearchS])

  // useEffect(()=>{
  //   console.log("Resultado R" ,rqsSearchR)
  //   console.log("Resultado S" ,rqsSearchS)
  // }, [rqsSearchR, rqsSearchS])

  
  useEffect(()=>{
    setRqsSearchR(filtrarR(datosR))
    if(datosR !== undefined && datosR !== null && datosR.length !== 0){
      setRqsSearchR((filtrarR(datosR)).sort((a, b) => a.id_reclamo - b.id_reclamo))
      console.log("ordenacion")
    }
    console.log("Datos R",datosR)
  }, [datosR])

  useEffect(()=>{
    console.log("Datos Search R", rqsSearchR)
    if(rqsSearchR !== undefined && rqsSearchR !== null && rqsSearchR.length !== 0){
      setLoadingRQS(false)
    }
  }, [rqsSearchR])
  
  useEffect(()=>{
    
  }, [datosS, datosR])

   const fetchClientes = async () => {
     try {

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

  useEffect(()=>{
    fetchClientes()
  }, [])


  return (
        <div className='moduloModuloRQS'>
          
          <div className='principalModuloRQS'>
              <div>
                <h2>Lista de Reclamos Solicitudes y Quejas</h2>
              </div>
              <div>
                <div>
                    <label className={'form-label'}>Seleccionar Tipo de Feedback:</label>
                    <select
                      name={'tipoFeedBack'}
                      className={'form-control'}
                      value={tipoFeedBack}
                      onChange={e => setTipoFeedBack(e.target.value)}
                    >
                      {opcionesFeedback.map(opcion => (
                        <option key={opcion} value={opcion}>
                          {opcion}
                        </option>
                      ))}
                    </select>
                </div>
                <div>
                    <label className={'form-label'}>Estado:</label>
                    <select
                      name={'tipoFeedBack'}
                      className={'form-control'}
                      value={estadoFeedBack}
                      onChange={e => setEstadoFeedBack(e.target.value)}
                    >
                      {opcionesEstado.map(opcion => (
                        <option key={opcion} value={opcion}>
                          {opcion}
                        </option>
                      ))}
                    </select>
                </div>
              </div>
              <div className='tablaRQS'>
                  <>
                    { !loadingRQS?
                    (<> 
                      {(tipoFeedBack === "Reclamo") &&
                        <>
                          { datosR.length > 0? 
                          <Reclamos reclamosClases={rqsSearchR} />
                          :<div className={"loadingRQS"}>No hay reclamos para mostrar</div>
                          }
                        </>
                      }  
                      {(tipoFeedBack === "Solicitud") &&
                        <>
                          { (datosS.length > 0)? 
                          <Solicitudes solicitudesClases={rqsSearchS} />
                          :<div className={"loadingRQS"}>No hay solicitudes para mostrar</div>
                          }
                        </>
                      } 
                    </>):
                    <div>Cargando datos...</div>
                    }
                  </>
              </div>
          </div>
        </div>
  )
}

export default RqsModulo