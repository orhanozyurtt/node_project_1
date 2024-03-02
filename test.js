import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// connect db
mongoose.connect('mongodb://localhost/pcat_test');

// create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// create a photo
// Photo.create({
//   title: 'Photo title 2',
//   description: 'Photo desc. 2 lorem ipsum',
// });

// veri getirme
// async function main() {
//   try {
//     const data = await Photo.find({});
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// main();

//------------

// update
// const id = '65e0f6672468a8d388cf79a5';
// async function update(id, newData) {
//   try {
//     const updatePhoto = await Photo.findByIdAndUpdate(id, newData, {
//       new: true,
//     });
//     console.log('güncel photo : ', updatePhoto);
//   } catch (error) {
//     console.log('hata : ', error);
//   }
// }
// const data = {
//   title: 'new photo 1 update',
//   description: 'new desc update data',
// };
// update(id, data);
const id = '65e0f6672468a8d388cf79a5';
async function deleteByid(id) {
  try {
    const deletePhoto = await Photo.findByIdAndDelete(id, { new: true });
    console.log('silinen photo : ', deletePhoto);
  } catch (error) {
    console.log('hata : ', error);
  }
}

deleteByid(id);
