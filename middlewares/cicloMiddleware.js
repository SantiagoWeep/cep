// middlewares/cicloMiddleware.js

const db = require('../config/db');

module.exports = async (req, res, next) => {

  try {

    const [ciclos] = await db.query(
      "SELECT id, anio FROM ciclos_lectivos ORDER BY anio DESC"
    );

    res.locals.ciclos = ciclos;

    if (!req.session.ciclo) {

      const anioActual = new Date().getFullYear();

      const cicloActual = ciclos.find(c => c.anio === anioActual);

      if (cicloActual) {
        req.session.ciclo = cicloActual.id;
      } else {
        req.session.ciclo = ciclos[0]?.id;
      }

    }

    req.ciclo = req.session.ciclo;
    res.locals.cicloActual = req.session.ciclo;

    next();

  } catch (err) {
    console.error("Error cargando ciclos", err);
    next();
  }

};