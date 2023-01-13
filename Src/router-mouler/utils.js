import multer from 'multer';

const storage = multer.diskStorage({
    // destination hara referencia a la carpeta donde se va a guarda el archivo
    destination: (req, file, cb) => {
        cb(null, __dirname + '/public/img');
    },
    // filename hara referencia al nombre del archivo
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
    
 } )
export const uploader = multer({storage}) 






