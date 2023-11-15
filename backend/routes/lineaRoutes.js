const express = require('express');
const router = express.Router();
const lineaController = require('../controllers/lineaController');

router.get('/buscarLineasPorDNI/:dni', lineaController.buscarLineasPorDNI);
router.get('/obtenerDetallesDeLinea/:numTelefono', lineaController.obtenerDetallesDeLinea);
router.get('/dniPorNumeroTelefono/:numTelefono', lineaController.dniPorNumeroTelefono);

module.exports = router;
