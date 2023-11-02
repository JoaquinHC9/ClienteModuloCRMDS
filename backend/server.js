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

app.use(express.json());
// Ruta para agregar detalles del cliente
app.post('/agregarDetallesCliente', (req, res) => {
    const {
    dni, direccion, codigoPostal, trabajo, hobie, estadoCivil, numHijos, contacExterno} = req.body;
    const query = 'INSERT INTO clienteDetallado (dni, direccion, codigoPostal, trabajo, hobie, estadoCivil, numHijos, contacExterno) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [dni, direccion, codigoPostal, trabajo, hobie, estadoCivil, numHijos, contacExterno];

    client.query(query, values)
        .then(() => {
            res.status(201).json({ message: 'Detalles del cliente registrados con éxito' });
        })
        .catch(err => {
            console.error(err); // Imprimir el error en la consola
            res.status(500).json({ error: 'Error en el registro de detalles del cliente' });
        });
})
  
//busqueda clientes
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
//busqueda datos del cliente detalle
app.get('/buscarClienteDetalladoPorDNI/:dni', (req, res) => {
  const dniABuscar = req.params.dni;
  const query = 'SELECT * FROM clienteDetallado WHERE dni = $1';    
  
  client.query(query, [dniABuscar])
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
      console.error(err);
      res.status(500).json({ error: 'Error en la consulta a la base de datos en clienteDetallado' });
    });    
});

app.put('/actualizarDetallesCliente/:dni', (req, res) => {
  const dniActualizar = req.params.dni; // Obtén el DNI de los parámetros de la URL
  const { direccion, codigoPostal, trabajo, hobie, estadoCivil, numHijos, contacExterno } = req.body;

  const queryUpdate = 'UPDATE clienteDetallado SET direccion = $2, codigoPostal = $3, trabajo = $4, hobie = $5, estadoCivil = $6, numHijos = $7, contacExterno = $8 WHERE dni = $1';
  const values = [dniActualizar, direccion, codigoPostal, trabajo, hobie, estadoCivil, numHijos, contacExterno];

  client.query(queryUpdate, values)
    .then(() => {
      res.status(200).json({ message: 'Detalles del cliente actualizados exitosamente' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar los detalles del cliente' });
    });
});


//obtener lineas por dni
app.get('/buscarLineasPorDNI/:dni', (req, res) => {
    const dniABuscar = req.params.dni;
    const query = 'SELECT * FROM linea_telefono WHERE dni = $1';  
    client.query(query, [dniABuscar])
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
  });
//obtener lineas por numero telefono
  app.get('/obtenerDetallesDeLinea/:numTelefono', (req, res) => {
    const numTelefono = req.params.numTelefono;
    const query = 'SELECT * FROM linea_telefono WHERE numerotelefono = $1';
  
    client.query(query, [numTelefono])
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
  });

app.listen(8081, () => {
    console.log("listening en el puerto 8081");
})