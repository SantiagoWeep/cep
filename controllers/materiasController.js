const db = require('../config/db');

exports.mostrarMaterias = async (req, res) => {

  try {

    const [materias] = await db.query(`
      SELECT * FROM materias
      ORDER BY nombre
    `);

    res.render('materias', {      
      materias,
      mensaje: req.query.msg
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando materias");
  }
};


exports.crearMateria = async (req, res) => {

  const { nombre } = req.body;

  try {

    await db.query(`
      INSERT INTO materias (nombre)
      VALUES (?)
    `, [nombre]);

    res.redirect('/admin/materias?msg=Materia creada');

  } catch (error) {
    console.error(error);
    res.status(500).send("Error creando materia");
  }

};

exports.editarMateria = async (req, res) => {

  const id = req.params.id;
  const { nombre } = req.body;

  try {

    await db.query(`
      UPDATE materias
      SET nombre = ?
      WHERE id = ?
    `, [nombre, id]);

    res.redirect('/admin/materias?msg=Materia editada');

  } catch (error) {
    console.error(error);
    res.status(500).send("Error editando materia");
  }

};


exports.eliminarMateria = async (req, res) => {

  const id = req.params.id;

  try {

    await db.query(`
      DELETE FROM materias
      WHERE id = ?
    `, [id]);

    res.sendStatus(200);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error eliminando materia");
  }

};