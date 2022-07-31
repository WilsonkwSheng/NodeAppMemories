import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'client', '/build')));

app.use(bodyParser.json( { limit: '30mb', extended: true } ));
app.use(bodyParser.urlencoded( { limit: '30mb', extended: true } ));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL, { useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`listening on port ${PORT}`)))
    .catch((error) => console.log(error.message));
