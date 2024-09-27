import express from 'express';
import { getAllLaptops } from './index.js';
import cors from 'cors'

const app = express();
const PORT = 3000;

app.use(cors());


app.get('/api/laptops', async (req, res) => {
  const laptops = await getAllLaptops();
  res.json(laptops);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
