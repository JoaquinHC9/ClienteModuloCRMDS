const db = require('../db');
const Observer = require('../observer');
const errorHandler = require('../errorHandler.js');

const clienteDetalladoObserver = new Observer();
module.exports = {

  addObserver: (observer) => {
    clienteDetalladoObserver.addObserver(observer);
  },

  agregarDetalles: (req, res) => {
    const { dni, direccion, codigo_postal, trabajo, hobie, estado_civil, num_hijos, contac_externo } = req.body;
    const query = 'INSERT INTO clienteDetallado (dni, direccion, codigo_postal, trabajo, hobie, estado_civil, num_hijos, contac_externo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [dni, direccion, codigo_postal, trabajo, hobie, estado_civil, num_hijos, contac_externo];

    db.query(query, values)
      .then(() => {
        clienteDetalladoObserver.notify('Detalles del cliente agregados con éxito');
        res.status(201).json({ message: 'Detalles del cliente registrados con éxito' });
      })
      .catch(err => {
        errorHandler.logError(err);
        res.status(500).json({ error: 'Error en el registro de detalles del cliente ' + err.message });
      });
  },
  buscarDetallesDNI: (req, res) => {
    const dniABuscar = req.params.dni;
    const query = 'SELECT * FROM clienteDetallado WHERE dni = $1';

    db.query(query, [dniABuscar])
      .then(response => {
        if (response.rows.length === 0) {
          console.log('No se encontraron resultados en clienteDetallado para el DNI: ' + dniABuscar);
          res.json({}); // Devolvemos un objeto vacío si no se encontraron resultados
        } else {
          console.log('Resultados de la búsqueda en clienteDetallado por DNI ' + dniABuscar + ':');
          console.log(response.rows);
          res.json(response.rows[0]); // Devolvemos el primer registro que coincide con el DNI
        }
      })
      .catch(err => {
        errorHandler.logError(err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos en clienteDetallado ' + err.message });
      });
  },
  actualizarDetallesCliente: (req, res) => {
    const dniActualizar = req.params.dni;
    const { direccion, codigo_postal, trabajo, hobie, estado_civil, num_hijos, contac_externo } = req.body;

    const queryUpdate = 'UPDATE clienteDetallado SET direccion = $2, codigo_postal = $3, trabajo = $4, hobie = $5, estado_civil = $6, num_hijos = $7, contac_externo = $8 WHERE dni = $1';
    const values = [dniActualizar, direccion, codigo_postal, trabajo, hobie, estado_civil, num_hijos, contac_externo];

    db.query(queryUpdate, values)
      .then(() => {
        res.status(200).json({ message: 'Detalles del cliente actualizados exitosamente' });
      })
      .catch(err => {
        errorHandler.logError(err);
        res.status(500).json({ error: 'Error al actualizar los detalles del cliente ' + err.message });
      });
  },
};
