const multer = require('multer');
const shortid = require('shortid');

const multerConfig = {
    storage: fileStorage = multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, __dirname+'../../uploads/'); // fotos se guardan aca
        },
        filename:(req,file,cb) => {
            // obtener extension
            const extension = file.mimetype.split('/')[1];
            // generar id para poner en nombre de img
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb) {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/png') { // condicion q solo acepta imagenes
            cb(null, true);
        } else {
            cb(new Error('Formato de imagen no válido'))
        }
    },
}

module.exports = multerConfig;