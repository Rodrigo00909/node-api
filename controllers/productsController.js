const multer = require('multer');
const multerConfig = require('../utils/multerConfig');

const Products = require('../models/Products');

const upload = multer(multerConfig).single('image'); // instancia - la imagen contenida desde el post sera almacenada en upload

exports.fileUpload = (req,res,next) => {
    upload(req,res,function(error) {
        if(error) {
            res.json({message: error});
        }
        return next()
    });
}

// agregar
exports.add = async(req,res) => {
    const product = new Products(req.body);

    try {
        if(req.file & req.file.filename) {
            product.image = req.file.filename; // tomar el nombre asignado
        }
        await product.save();
        res.json({message: 'Nuevo producto agregado correctamente.'});
    } catch (error) {
        if(error.code === 11000) {
            res.status(400).json({
                message: `Ya existe un producto con el sku: ${req.body.sku}`,
            });
        } else {
            res.status(400).json({message:'Error al procesar la petición'});
        }
    }
}

// listar
exports.list = async(req, res) => {
    try {
        const products = await Products.find({});
        res.json(products);
    } catch (error) {
        res.status(400).json({message: 'Error al procesar la petición'});
        next();
    }
}

// leer por id
exports.show = async(req,res,next) => {
    try {
        const product = await Products.findById(req.params.id);
        if(!product) {
            res.status(404).json({message: 'El producto no existe'});
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({message: 'Error al procesar la petición'});
    }
}

//actualizar
exports.update = async(req,res,next) => {
    try {
        let newProduct = req.body;
        if(req.file & req.file.filename) { // si recibio img
            newProduct.image = req.file.filename; // guardar de la img
        } else { // para no perder la img, rescatar el nombre de la imagen asignado en mongo
            const product = await Product.findById(req.params.id);
            newProduct.image = product.image; // se guarda en nuevo producto
        }
        const productUpdated = await Products.findOneAndUpdate(
            {_id: req.params.id},
            newProduct, 
            {new:true}
        );
        res.json({message: 'Producto actualizado correctamente'});
    } catch (error) {
        if(error.code === 11000) {
            res.status(400).json({message: `Ya existe un producto con el sku: ${req.body.sku}`});
        } else {
            res.status(400).json({message: 'Error al procesar la petición'});
        }
    }
}

// Eliminar
exports.delete = async(req,res,next) => {
    try {
        await Products.findOneAndDelete({_id: req.params.id});
        res.json({message:'El producto ha sido eliminado'});
    } catch (error) {
        res.status(400).json({message: 'Error al procesar la petición'});
    }
}