const express = require('express');
const router = express.Router();
const clienteDetallesController = require('../controllers/clienteDetallesController');

router.post('/agregarDetallesCliente', clienteDetallesController.agregarDetallesCliente);
router.get('/buscarClienteDetalladoPorDNI/:dni', clienteDetallesController.buscarClienteDetalladoPorDNI);
router.put('/actualizarDetallesCliente/:dni', clienteDetallesController.actualizarDetallesCliente);

module.exports = router;
