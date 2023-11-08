const db = require('../db');

module.exports = {
  buscarLineasPorDNI: (req, res) => {
    const dniABuscar = req.params.dni;
    const query = 'SELECT * FROM linea_telefono WHERE dni = $1';

    db.query(query, [dniABuscar])
      .then(response => {
        if (response.rows.length === 0) {
          console.log('No se encontraron líneas para el DNI: ' + dniABuscar);
        } else {
          console.log('Resultados de la búsqueda de líneas por DNI ' + dniABuscar + ':');
          console.log(response.rows);
        }
        res.json(response.rows);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
      });
  },

  obtenerDetallesDeLinea: (req, res) => {
    const numTelefono = req.params.numTelefono;
    const query = 'SELECT * FROM linea_telefono WHERE numerotelefono = $1';

    db.query(query, [numTelefono])
      .then(response => {
        if (response.rows.length === 0) {
          console.log('No se encontraron detalles para el número de teléfono: ' + numTelefono);
          res.status(404).json({ error: 'No se encontraron detalles para el número de teléfono' });
        } else {
          console.log('Detalles de la línea para el número de teléfono ' + numTelefono + ':');
          console.log(response.rows);
          res.json(response.rows);
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
      });
  },
};
