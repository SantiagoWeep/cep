const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
dotenv.config();
const db = require('./config/db');
const app = express();
const cicloMiddleware = require('./middlewares/cicloMiddleware');

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',      
  parameterLimit: 10000 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS y Layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('layout', 'administracion'); 
app.use(expressLayouts);

const session = require('express-session');

app.use(session({
  secret: 'sistema-escolar',
  resave: false,
  saveUninitialized: false
}));

app.use(cicloMiddleware); 



// Rutas
const authRoutes = require('./routes/authRoutes');
const calificacionRoutes = require('./routes/calificacionRutas');
const boletinRoutes = require('./routes/boletinRoutes');
const authAlumnoRoutes = require('./routes/authAlumnoRoutes');
const authAdminRoutes = require('./routes/authAdministracionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const alumnosRoutes = require('./routes/alumnosRoutes');
const profesoresRoutes = require('./routes/profesoresRoutes');
const adminBoletinRoutes = require('./routes/adminBoletinRoutes');
const adminNotasRoutes = require('./routes/adminNotasRoutes');
const materiasRoutes = require('./routes/materiaRoutes');
const ciclosRoutes = require('./routes/ciclosRoutes');

// Usar rutas
app.use(alumnosRoutes);
app.use(adminRoutes);
app.use(authAdminRoutes);
app.use(authRoutes);
app.use(calificacionRoutes);
app.use(boletinRoutes);
app.use(authAlumnoRoutes);
app.use(profesoresRoutes);
app.use(adminBoletinRoutes);
app.use(adminNotasRoutes);
app.use(materiasRoutes);
app.use(ciclosRoutes);


// Ruta principal sin layout
app.get('/', (req, res) => {
  res.render('index', { layout: false });
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { layout: false }); // Evita usar el layout en la vista 404
});

// Error de servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});

// Puerto
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
