const express = require('express');

const router = express.Router();

const customersController = require('../controllers/customersController');
const productsController = require('../controllers/productsController');

module.exports = function() {
    // post 
    router.post('/customers', customersController.add);
    // peticion get: /customers - Mostrar lista de clientes
    router.get('/customers', customersController.list);
    // leer cliente: get /customers/:id
    router.get('/customers/:id', customersController.show);
    // actualizar clientes put
    router.put('/customers/:id', customersController.update);
    // borrar
    router.delete('/customers/:id', customersController.delete);

    // productos
    // post 
    router.post('/products', 
        productsController.fileUpload,
        productsController.add
    );
    // peticion get: /customers - Mostrar lista de clientes
    router.get('/products', productsController.list);
    // leer cliente: get /customers/:id
    router.get('/products/:id', productsController.show);
    // actualizar clientes put
    router.put('/products/:id',
        productsController.fileUpload,
        productsController.update
    );
    // borrar
    router.delete('/products/:id', productsController.delete);
    return router;
}