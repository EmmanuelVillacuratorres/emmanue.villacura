const express = require('express');
const cors = require('cors');

const app = express();         // <-- Primero define app
app.use(cors());               // <-- Luego usa app

app.use(express.json());

const productos = require('./productos');
app.use('/api/productos', productos);

const usuarios = require('./usuarios');
app.use('/api/usuarios', usuarios);

const reservasRouter = require('./reservas');
app.use('/api/reservas', reservasRouter);

app.listen(4000, () => console.log('API corriendo CTM'));