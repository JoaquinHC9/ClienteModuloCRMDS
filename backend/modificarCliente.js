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
app.use(express.json());
//modificar perfil datos del cliente detalle, falta modificar datos del cliente
app.put('/api/clientesDetallados/:dni', (req, res) => {
    const dniActualizar = req.params.dni;
    const { codigoPostal, trabajo, hobie, estadoCivil, numHijos, contacExterno } = req.body;

    // Verifica si el cliente detallado existe antes de actualizar
    const queryExistencia = 'SELECT * FROM clienteDetallado WHERE dni = $1';
    client.query(queryExistencia, [dniActualizar])
        .then(response => {
            if (response.rows.length === 0) {
                res.status(404).json({ error: 'Cliente detallado no encontrado' });
            } else {
                const query = 'UPDATE clienteDetallado SET codigoPostal = $1, trabajo = $2, hobie = $3, estadoCivil = $4, numHijos = $5, contacExterno = $6 WHERE dni = $7';
                const values = [codigoPostal, trabajo, hobie, estadoCivil, numHijos, contacExterno, dniActualizar];

                client.query(query, values)
                    .then(() => {
                        res.status(200).json({ message: 'Actualización exitosa' });
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ error: 'Error en la actualización' });
                    });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        });
});
app.listen(8081, () => {
    console.log("listening en el puerto 8081");
})