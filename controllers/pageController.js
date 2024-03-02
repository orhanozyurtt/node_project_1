import Photo from '../models/Photo.js';
const getAboutPage = (req, res) => {
  res.render('about');
};
const getAddPage = (req, res) => {
  res.render('add');
};

const getEditPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};
export default { getAboutPage, getAddPage, getEditPage };
/*

import {
  getAboutPage,
  getAddPage,
  getEditPage,
} from './controllers/pageController.js';

*/
