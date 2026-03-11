// controllers/cicloController.js

const db = require('../config/db');

exports.cambiarCiclo = (req, res) => {

  const ciclo = req.body.ciclo;

  req.session.ciclo = ciclo;

  res.redirect('back');

};