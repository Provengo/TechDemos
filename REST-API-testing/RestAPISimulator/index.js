import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/posts.js';

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/', routes);
 
app.listen(3003, () =>
  console.log(`Example app listening on port 3003!`),
);
