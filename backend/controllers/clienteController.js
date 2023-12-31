const db = require('../db');
const errorHandler = require('../errorHandler.js');

errorHandler.addObserver((error) => {
  console.log(`Notificación de error: ${error}`);  
});

module.exports = {
  getAllClientes: (req, res) => {
    db.query('SELECT * FROM cliente')
      .then(response => {
        console.log(response.rows);
        res.json(response.rows);
      })
      .catch(err => {
        errorHandler.logError(err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' + err.message});
      });
  },
  createCliente: (req, res) => {
    const { dni, nombre, apellido, fechaNacimiento, distrito, departamento, fechaAfiliacion, email, sexo } = req.body;
    const query = 'INSERT INTO cliente (dni, nombre, apellido, fechanac, distrito, departamento, fechaafili, correo, sexo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [dni, nombre, apellido, fechaNacimiento, distrito, departamento, fechaAfiliacion, email, sexo];

    db.query(query, values)
      .then(() => {
        res.status(201).json({ message: 'Registro exitoso ' });
      })
      .catch(err => {
        errorHandler.logError(err);
        res.status(500).json({ error: 'Error en el registro: '+ err.message }); 
      });
  },
  buscarClientePorDNI: (req, res) => {
    const dniABuscar = req.params.dni;
    const query = 'SELECT * FROM cliente WHERE dni = $1';
  
    db.query(query, [dniABuscar])
      .then(response => {
        if (response.rows.length === 0) {
          console.log('No se encontraron resultados para el DNI: ' + dniABuscar);
          res.json({ error: 'No se encontraron resultados para el DNI: ' + dniABuscar });
        } else {
          console.log('Resultado de la búsqueda por DNI ' + dniABuscar + ':');
          console.log(response.rows[0]); // Tomar el primer resultado (asumiendo que es único)
          res.json(response.rows[0]);
        }
      })
      .catch(err => {
        errorHandler.logError(err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos ' + err.message });
      });
  },
  buscarClientePorNombre: (req, res) => {
    const nombreABuscar = req.params.nombre;
    const query = 'SELECT * FROM cliente WHERE nombre = $1';

    db.query(query, [nombreABuscar])
      .then(response => {
        if (response.rows.length === 0) {
          console.log('No se encontraron resultados para el nombre: ' + nombreABuscar);
        } else {
          console.log('Resultados de la búsqueda por nombre ' + nombreABuscar + ':');
          console.log(response.rows);
        }
        res.json(response.rows);
      })
      .catch(err => {
        errorHandler.logError(err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos ' + err.message });
      });
  },
  buscarClientePorApellido: (req, res) => {
    const apellidoABuscar = req.params.apellido;
    const query = 'SELECT * FROM cliente WHERE apellido = $1';

    db.query(query, [apellidoABuscar])
      .then(response => {
        if (response.rows.length === 0) {
          console.log('No se encontraron resultados para el apellido: ' + apellidoABuscar);
        } else {
          console.log('Resultados de la búsqueda por apellido ' + apellidoABuscar + ':');
          console.log(response.rows);
        }
        res.json(response.rows);
      })
      .catch(err => {
        errorHandler.logError(err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
      });
  },
};
