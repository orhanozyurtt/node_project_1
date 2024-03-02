import express from 'express';
import Photo from '../models/Photo.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fileUpload from 'express-fileupload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(fileUpload());

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', { photos });
};

const getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
  // console.log(req.params.id);
};

const createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadImage = req.files.image;
  let uploadPath = path.join(__dirname, '../public/uploads/', uploadImage.name);
  console.log(uploadPath);
  // let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
};

const updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};
const deletePhoto = async (req, res) => {
  try {
    // db deki tüm yığın gelir
    const photo = await Photo.findOne({ _id: req.params.id });

    if (!photo) {
      return res.status(404).send('Fotoğraf bulunamadı');
    }

    // dosya var mı diye aranır
    const filePath = path.join(__dirname, '../public/', photo.image);
    // Dosya varsa sil
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      //console.log(`Dosya ${filePath} başarıyla silindi.`);
    }
    /**
     * else {
      console.log(`Dosya ${filePath} bulunamadı.`);
    }
     */

    // Veritabanından fotoğrafı sil
    await Photo.findByIdAndDelete(req.params.id);
    console.log(`Veritabanından fotoğraf başarıyla silindi.`);

    res.redirect('/');
  } catch (error) {
    console.error('Silme işlemi sırasında bir hata oluştu:', error);
    res.status(500).send('Silme işlemi sırasında bir hata oluştu.');
  }
};

export default {
  getAllPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
};
