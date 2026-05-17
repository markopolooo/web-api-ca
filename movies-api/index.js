import dotenv from 'dotenv';
import express from 'express';
import './db';
// other imports
import cors from 'cors';
import usersRouter from './api/users';
import authenticate from './authenticate';

dotenv.config();

const errHandler = (err, req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).json({ error: 'Something went wrong!' });
  }
  res.status(500).json({ error: err.message });
};

const app = express();

const port = process.env.PORT;

// Enable CORS for all requests
app.use(cors());


app.use(express.static('public'));

app.use(express.json());

//Users router
app.use('/api/users', usersRouter);



app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
