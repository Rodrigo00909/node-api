const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index');

const app = express();

// Conectar api a mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/node-api',
    {
        useNewUrlParser: true,
    }
);

// Habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar cors
app.use(cors());

// Las funciones node requieren de dos parametros: request: peticion a nuesto servidor y response que es el objeto a traves el cual el servidor responderá
/* app.get('/', function(req, res) {
    res.send('Probando probando probando probandox2');
}); */

app.use('/', routes());

app.use(express.static('uploads')); // carpeta expuesta(publica) para q se pueda ver las fotos

app.listen(5000, function() {
    console.log('Servidor web express en ejecucion');
});