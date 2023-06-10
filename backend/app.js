require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorsHandler = require('./errors/errorsHandler');
const router = require('./routes/index');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017g/mestodb ', {
  useNewUrlParser: true,
});

app.use('/', router);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
