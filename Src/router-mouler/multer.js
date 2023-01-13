import express from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,'/public/img')
    },
    filename : function (req,file,cb) {
        cb(null,file.originalname)
    }
    
});
const uploader = multer({storage})
    const app = express();


    app.post('/', uploader.single('file'),(req,res) => {
        if(!req.file){
            return res.status(400)/RTCRtpSender({status:'error',error: 'No se pudo guardar la imagen'})
        }
        console.log(req.file)
        const filepath = req.file.path;
        console.log(filepath);
        res.send({status:'success',message: 'File successfully uploaded'})
    })
