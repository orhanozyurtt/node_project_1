import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import methodOverride from 'method-override';
//import Photo from './models/Photo.js';
//import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import fs from 'fs';

import photoControllers from './controllers/photoControllers.js';
import pageController from './controllers/pageController.js';

const app = express();
const port = 3000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

mongoose.connect('mongodb://localhost/pcat_test');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

// routes
app.get('/', photoControllers.getAllPhotos);
app.get('/photos/:id', photoControllers.getPhoto);
app.post('/photos', photoControllers.createPhoto);
app.put('/photos/:id', photoControllers.updatePhoto);
app.delete('/photos/:id', photoControllers.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
