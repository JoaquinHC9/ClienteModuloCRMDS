const express = require('express');
const router = express.Router();
const clienteDetallesController = require('../controllers/clienteDetallesController');

router.post('/agregarDetallesCliente', clienteDetallesController.agregarDetalles);
router.put('/actualizarDetallesCliente/:dni', clienteDetallesController.actualizarDetallesCliente);
router.get('/buscarDetallesDNI/:dni', clienteDetallesController.buscarDetallesDNI);

module.exports = router;
