const express = require('express');
const router = express.Router();
const clienteDetallesController = require('../controllers/clienteDetallesController');

router.post('/agregarDetallesCliente', clienteDetallesController.agregarDetalles);
router.get('/buscarDetallesDNI/:dni', clienteDetallesController.buscarDetallesDNI);
router.put('/actualizarDetallesCliente/:dni', clienteDetallesController.actualizarDetallesCliente);

module.exports = router;
