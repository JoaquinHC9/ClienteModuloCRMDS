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

app.get('/clientes', (req, res) => {
    client.query('SELECT * FROM cliente')
    .then(response => {
        console.log(response.rows);
        client.end();
        res.json(response.rows);
    })
    .catch(err => {
        client.error(err);
        res.status(500),json({ error: 'Error en la consulta a la base de datos'});
    });
});

app.listen(8081, ()=>{
    console.log("listening en el puerto 8081");
})