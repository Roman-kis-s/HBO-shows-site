require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./controllers/error');
const authRoutes = require('./routes/auth');
const showRoutes = require('./routes/show');
const seasonRoutes = require('./routes/season');
const episodeRoutes = require('./routes/episode');
const {priorityShow} = require('./controllers/show');

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Example
// http://localhost:3001/api/shows/game-of-thrones/seasons/5-season/episodes/1-pilot
app.use('/api/auth', authRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/shows/:show/seasons', seasonRoutes);
app.use('/api/shows/:show/seasons/:season/episodes', episodeRoutes);

//fetch one prior show for main page
app.get("/api/", priorityShow);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


//simple error handler with json callback
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is starting on ${PORT} port`));

