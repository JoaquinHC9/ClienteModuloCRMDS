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
}

const client = new Client(connectionData)

client.connect();

app.get('/registerAPI', (req, res) => {
    client.query('SELECT * FROM cliente')
        .then(response => {
            console.log(response.rows);
            res.json(response.rows);
        })
        .catch(err => {
            client.error(err);
            res.status(500), json({ error: 'Error en la consulta a la base de datos' });
        });
});

app.use(express.json());

app.post('/registerAPI', (req, res) => {
    const { dni, nombre, apellido, fechaNacimiento, distrito, departamento, fechaAfiliacion, email, sexo } = req.body;
    const query = 'INSERT INTO cliente (dni, nombre, apellido, fechanac, distrito, departamento, fechaafili, correo, sexo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [dni, nombre, apellido, fechaNacimiento, distrito, departamento, fechaAfiliacion, email, sexo];

    client.query(query, values)
        .then(() => {
            res.status(201).json({ message: 'Registro exitoso ' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error en el registro' });
        })
});

app.get('/buscarPorDNI/:dni', (req, res) => {
    const dniABuscar = req.params.dni;
    const query = 'SELECT * FROM cliente WHERE dni = $1';

    client.query(query, [dniABuscar])
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

    client.query(query, [nombreABuscar])
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

app.get('/buscarPorApellido/:apellido', (req, res) => {
    const apellidoABuscar = req.params.apellido;
    const query = 'SELECT * FROM cliente WHERE apellido = $1';

    client.query(query, [apellidoABuscar])
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
            console.error(err);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        });
});
// Ruta para recuperar datos de la tabla clienteDetallado por DNI
app.get('/buscarClienteDetalladoPorDNI/:dni', (req, res) => {
    const dniABuscar = req.params.dni;
    const query = 'SELECT * FROM clienteDetallado WHERE dni = $1';

    client.query(query, [dniABuscar])
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
})