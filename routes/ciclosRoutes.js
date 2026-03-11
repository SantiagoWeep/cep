const express = require('express');
const router = express.Router();

const ciclosController = require('../controllers/ciclosController');

router.post('/admin/cambiar-ciclo', ciclosController.cambiarCiclo);

module.exports = router;