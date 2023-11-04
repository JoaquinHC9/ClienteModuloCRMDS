const { Client } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const connectionData = {
  user: 'postgres',
  host: 'localhost',
  database: 'telecomunicaciones',
  password: 'Jjba222716',
  port: 5432,
};

class DatabaseProxy {
  constructor(connectionData) {
    this.client = new Client(connectionData);
    this.client.connect();
  }

  query(sql, values) {
    return this.client.query(sql, values);
  }
}

const dbProxy = new DatabaseProxy(connectionData);

app.use(express.json());

app.get('/buscarPorDNI/:dni', (req, res) => {
  const dniABuscar = req.params.dni;
  const query = 'SELECT * FROM cliente WHERE dni = $1';

  dbProxy.query(query, [dniABuscar])
    .then(response => {
      if (response.rows.length === 0) {
        console.log('No se encontraron resultados para el DNI: ' + dniABuscar);
      } else {
        console.log('Resultados de la búsqueda por DNI ' + dniABuscar + ':');
        console.log(response.rows);
      }
      res.json(response.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    });
});

app.get('/buscarPorNombre/:nombre', (req, res) => {
  const nombreABuscar = req.params.nombre;
  const query = 'SELECT * FROM cliente WHERE nombre = $1';

  dbProxy.query(query, [nombreABuscar])
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
});

app.get('/buscarClienteDetalladoPorDNI/:dni', (req, res) => {
  const dniABuscar = req.params.dni;
  const query = 'SELECT * FROM clienteDetallado WHERE dni = $1';

  dbProxy.query(query, [dniABuscar])
    .then(response => {
      if (response.rows.length === 0) {
        console.log('No se encontraron resultados en clienteDetallado para el DNI: ' + dniABuscar);
      } else {
        console.log('Resultados de la búsqueda en clienteDetallado por DNI ' + dniABuscar + ':');
        console.log(response.rows);
      }
      res.json(response.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error en la consulta a la base de datos en clienteDetallado' });
    });
});

app.listen(8081, () => {
  console.log("listening en el puerto 8081");
});
