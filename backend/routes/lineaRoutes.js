const express = require('express');
const router = express.Router();
const lineaController = require('../controllers/lineaController');

router.get('/buscarLineasPorDNI/:dni', lineaController.buscarLineasPorDNI);
router.get('/obtenerDetallesDeLinea/:numTelefono', lineaController.obtenerDetallesDeLinea);

module.exports = router;
