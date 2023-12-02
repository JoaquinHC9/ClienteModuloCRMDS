import React from 'react'
import styles from '../rqsModulo.module.css';
import {Link, useNavigate} from "react-router-dom";

const   Solicitudes = ({ solicitudesClases }) => {
  return (
      <table className='tableRQS'>
        <thead>
          <tr>
            <th>ID</th>
            <th>FECHA</th>
            <th>CLIENTE</th>
            <th>DETALLE</th>
            <th>DETALLES</th>
            <th>ACCION</th>
            <th>ACCION</th>
          </tr>
        </thead>
        <tbody>
          {solicitudesClases.map(solicitud => {
          return (
            <tr key={solicitud.id_solicitud}>
              <td>{solicitud.id_solicitud}</td>
              <td>{solicitud.fecha_solicitud}</td>
              <td>{solicitud.id_cliente}</td>
              <td>{solicitud.estado}</td>
              <td>
              {
                solicitud.detalle_solicitud
                  ? (solicitud.detalle_solicitud.length <= 20
                    ? solicitud.detalle_solicitud
                    : `${solicitud.detalle_solicitud.slice(0, 20)}...`)
                  : ''
                }                  
              </td>
              <td>
                <Link to={`/modulorqs/solicitud/${solicitud.id_solicitud}`}>
                <div className={styles.estadoButton + ' ' + styles.verde}>Ver</div>
                </Link> 
              </td>
              <td>
                <Link to={`/modulorqs/solicitudEdit/${solicitud.id_solicitud}`}>
                <div className={styles.estadoButton + ' ' + styles.verde}>Editar</div>
                </Link>
              </td>
            </tr>
          )
          })}
        </tbody>
      </table>
    
  )
}

export default Solicitudes