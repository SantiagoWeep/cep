const express = require('express');
const router = express.Router();
const materiasController = require('../controllers/materiasController');
const { verifyAdministracion } = require('../controllers/authAdministracionController');

router.get('/admin/materias', verifyAdministracion, materiasController.mostrarMaterias);

router.post('/admin/materias', verifyAdministracion, materiasController.crearMateria);

router.post('/admin/materias/editar/:id', verifyAdministracion, materiasController.editarMateria);

router.delete('/admin/materias/eliminar/:id', verifyAdministracion, materiasController.eliminarMateria);

module.exports = router;