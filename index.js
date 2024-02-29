import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

//middlewares
app.use(express.static('public'));

app.get('/', (req, res) => {
  const photo = {
    id: 1,
    name: 'Photo name',
    description: 'photo description',
  };
  res.sendFile(path.resolve(__dirname, 'temp', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
