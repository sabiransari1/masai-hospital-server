const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connection = require('./db.js');
const userRoutes = require('./routes/userRoutes.js');

app.use(express.json());
app.use(express.text());
app.use(cors());

app.get('/', (req, res) => {
  try {
    return res.status(200).send('Masai Hospital ...');
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

app.use('/user', userRoutes);

app.listen(process.env.PORT || 7070, () => {
  try {
    connection();

    console.log(`Server is running on port ${process.env.PORT || 7070}...`);
  } catch (error) {
    console.log({ error: error.message });
  }
});
