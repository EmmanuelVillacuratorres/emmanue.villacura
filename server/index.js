const express = require('express');
const cors = require('cors');

const app = express();         // <-- Primero define app
app.use(cors());               // <-- Luego usa app

app.use(express.json());

const productos = require('./productos');
app.use('/api/productos', productos);

const usuarios = require('./usuarios');
app.use('/api/usuarios', usuarios);

app.listen(4000, () => console.log('API corriendo en puerto 4000'));