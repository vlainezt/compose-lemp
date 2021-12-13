//CARGA DE MODULOS
var express = require('express');


//Ejecutar express (HTTP)
var app = express();

//Cargar Ficheros rutas

var FirmasRoute = require('./routes/Firmas');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//AÑADIR PREFIJO A RUTAS
app.use('/api',FirmasRoute);


//EXPORTAR MODULO (Fihero actual)

module.exports = app;