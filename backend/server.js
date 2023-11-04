const { Client } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const connectionData = {
  user: 'postgres',
  host: 'localhost',
  database: 'telecomunicacionesv2',
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

app.get('/registerAPI', (req, res) => {
  dbProxy.query('SELECT * FROM cliente')
    .then(response => {
      console.log(response.rows);
      res.json(response.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    });
});

app.use(express.json());
app.post('/registerAPI', (req, res) => {
  const { dni, nombre, apellido, fechaNacimiento, distrito, departamento, fechaAfiliacion, email, sexo } = req.body;
  const query = 'INSERT INTO cliente (dni, nombre, apellido, fechanac, distrito, departamento, fechaafili, correo, sexo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  const values = [dni, nombre, apellido, fechaNacimiento, distrito, departamento, fechaAfiliacion, email, sexo];

  dbProxy.query(query, values)
    .then(() => {
      res.status(201).json({ message: 'Registro exitoso ' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error en el registro' });
    });
});

app.listen(8081, () => {
  console.log("listening en el puerto 8081");
});
