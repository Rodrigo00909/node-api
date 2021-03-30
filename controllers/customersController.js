const Customers = require('../models/Customers');

// Agregar cliente
exports.add = async(req, res) => {
    const customer = new Customers(req.body);
    try {
        await customer.save();
        res.json({message: 'Nuevo cliente añadido'})
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

// Acción: List
exports.list = async(req, res) => {
    try {
        const customers = await Customers.find({});
        res.json(customers); 
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

// Leer cliente
exports.show = async(req, res, next) => {
    try {
        const customer = await Customers.findById(req.params.id);
        if(!customer) {
            res.status(404).json({
                message: 'El cliente no existe',
            });
        }

        res.json(customer);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion',
        });
    }
}

//actualizar
exports.update = async(req,res,next) => {
    try {
        const customer = await Customers.findOneAndUpdate(
            {_id: req.params.id},
            req.body, 
            {new: true} // Devolver objeto actualizado: res.json(customer)
            );
            res.json({message: 'Cliente actualizado'});
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion',
        });
    }
}

//eliminar
exports.delete = async(req,res,next) => {
    try {
        await Customers.findOneAndDelete({_id: req.params.id});
        res.json({message: 'El cliente ha sido eliminado con éxito.'});
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion',
        }); 
    }
}