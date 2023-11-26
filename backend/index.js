// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

const clienteRoutes = require('./routes/clienteRoutes');
const clienteDetalladoRoutes = require('./routes/clienteDetalladoRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/clientes', clienteRoutes);
app.use('/detallesCliente', clienteDetalladoRoutes);
app.use('/admin', adminRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening en el puerto ${port}`);
});