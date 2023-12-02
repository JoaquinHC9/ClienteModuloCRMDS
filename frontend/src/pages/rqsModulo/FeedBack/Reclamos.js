import React from 'react'
import styles from '../rqsModulo.module.css';
import {Link, useNavigate} from "react-router-dom";

const Reclamos = ({ reclamosClases }) => {
  return (
    
      <table className='tableRQS'>
        <thead>
          <tr>
            <th>ID</th>
            <th>FECHA</th>
            <th>DNI CLIENTE</th>
            <th>ESTADO</th>
            <th>DESCRIPCION</th>
            <th>ACCION</th>
            <th>ACCION</th>
          </tr>
        </thead>
        <tbody>
          {reclamosClases.map(reclamo => (
            <tr key={reclamo.id_reclamo}>
              <td>{reclamo.id_reclamo}</td>
              <td>{reclamo.fecha_reclamo}</td>
              <td>{reclamo.id_cliente}</td>
              <td>{reclamo.estado}</td>
              <td>
                {
                  reclamo.detalle_reclamo
                    ? (reclamo.detalle_reclamo.length <= 20
                      ? reclamo.detalle_reclamo
                      : `${reclamo.detalle_reclamo.slice(0, 20)}...`)
                    : ''
                }                
              </td>
              <td>
                <Link to={`/modulorqs/reclamo/${reclamo.id_reclamo}`}>
                <div className={styles.estadoButton + ' ' + styles.verde}>Ver</div>
                </Link>
              </td>
              <td>
                <Link to={`/modulorqs/reclamoEdit/${reclamo.id_reclamo}`}>
                <div className={styles.estadoButton + ' ' + styles.verde}>Editar</div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
  )
}

export default Reclamos