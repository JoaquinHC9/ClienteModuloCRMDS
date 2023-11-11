const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getAllClientes);
router.post('/registarCliente', clienteController.createCliente);
router.get('/buscarPorDNI/:dni', clienteController.buscarClientePorDNI);
router.get('/buscarPorNombre/:nombre', clienteController.buscarClientePorNombre);
// Agrega más rutas para otras operaciones relacionadas con clientes

module.exports = router;
