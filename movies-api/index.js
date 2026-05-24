import dotenv from 'dotenv';
import moviesRouter from './api/movies';  
import express from 'express';
import './db';
// other imports
import cors from 'cors';
import usersRouter from './api/users';
import authenticate from './authenticate';
import favouritesRouter from './api/favourites/index.js';

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




app.use(express.json());

app.use('/api/movies', moviesRouter); 

app.use('/api/favourites', authenticate, favouritesRouter);

//Users router
app.use('/api/users', usersRouter);

app.use(express.static('public'));

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
