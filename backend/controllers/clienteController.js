const db = require('../db');

class ClienteObserver{
  actualizar(cliente){
    throw new Error('Actualizar debe ser implementado por las clases concretas');
  }
}

class RegistroClienteObserver extends ClienteObserver {
  actualizar(cliente) {
    console.log('Nuevo cliente registrado: ', cliente);
  }
}

class ClienteSubject {
  constructor() {
    this.observadores = [];
  }

  agregarObservador(observador) {
    this.observadores.push(observador);
  }

  quitarObservador(observador){
    this.observadores = this.observadores.filter(obs => obs!== observador);
  }

  notificarObservadores(cliente) {
    this.observadores.forEach(observador => {
      observador.actualizar(cliente);
    })
  }
}

module.exports = {
  getAllClientes: (req, res) => {
    db.query('SELECT * FROM cliente')
      .then(response => {
        console.log(response.rows);
        res.json(response.rows);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
      });
  },
  createCliente: (req, res) => {
    const { dni, nombre, apellido, fechaNacimiento, distrito, departamento, fechaAfiliacion, email, sexo } = req.body;
    const query = 'INSERT INTO cliente (dni, nombre, apellido, fechanac, distrito, departamento, fechaafili, correo, sexo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [dni, nombre, apellido, fechaNacimiento, distrito, departamento, fechaAfiliacion, email, sexo];

    db.query(query, values)
      .then(() => {

        const nuevoCliente = {dni, nombre, apellido, fechaNacimiento, distrito, departamento, fechaAfiliacion, email, sexo };

        cliente.Subject.notificarObservadores(nuevoCliente);

        res.status(201).json({ message: 'Registro exitoso ' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error en el registro' });
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
        console.error(err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
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
        console.error(err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
      });
  },
};
