import path from "path";
import fs from "fs";
import multer from "multer";
import { Img } from "../models/Image.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { imageProcessingFailure } from "../utils/imageProcessingFailure.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;

        const mimeType = fileTypes.test(file.mimetype);

        const extName = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extName) {
            return cb(null, true);
        }

        cb(console.log("Error: El archivo no es una imagen"));
    }
}).single("image");

export const getImages = async (req, res) => {
    try {
        const images = await Img.find({userID: req.uid}).lean();

        if (!images) throw new Error("No hay imagenes en la DB");

        res.json(images);
    } catch (error) {
        res.json(error.message);
    }
}

export const uploadImage = (req, res) => {
    upload(req, res, async (err) => {
        try {
            imageProcessingFailure(err);

            const img = new Img({ name: req.file.filename, userID: req.uid });

            await img.save();

            console.log(img);

            res.json({upload: "Se guardo la imagen"});
        } catch (error) {
            res.json({error: error.message});
        }
    })
}

//FALTA RECIBIR EL NUEVO NOMBRE DE LA IMAGEN DEL FRONT Y CAMBIARLO EN EL SERVER Y EN LA DB
export const editImage = (req, res) => {
    upload(req, res, async (err) => {
        try {
            imageProcessingFailure(err);

            const image = await Img.findById(req.params.id).lean();

            if (!image.userID.equals(req.uid)) throw new Error("No eres el propietario de esta imagen");;
            
            const dirFile = path.join(__dirname, `../public/images/uploads/${image.name}`);

            fs.renameSync(req.file.path, dirFile);

            res.json({ edit: `Se edito la imagen: ${image.name}` });
        } catch (error) {
            res.json({ error: error.message });
        }
    });
}

export const deleteImage = async (req, res) => {
    try {
        const image = await Img.findById(req.params.id);

        if (!image) throw new Error("No se encontro la imagen en la DB");

        if (!image.userID.equals(req.uid)) throw new Error("No eres el propietario de esta imagen");;

        const dirFile = path.join(__dirname, `../public/images/uploads/${image.name}`);
        fs.unlinkSync(dirFile);

        await image.remove();

        res.json({ delete: `Se elimino la imagen: ${image.name}` });
    } catch (error) {
        res.json({ error: error.message });
    }
}