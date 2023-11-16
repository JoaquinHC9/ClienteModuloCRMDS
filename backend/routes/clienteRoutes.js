const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getAllClientes);
router.post('/registarCliente', clienteController.createCliente);
router.get('/buscarPorDNI/:dni', clienteController.buscarClientePorDNI);
router.get('/buscarPorNombre/:nombre', clienteController.buscarClientePorNombre);
router.get('/buscarPorApellido/:apellido', clienteController.buscarClientePorApellido);

module.exports = router;
