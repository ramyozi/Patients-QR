const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const mongoDBUri = process.env.MONGODB_URI;
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World from AppliPatientsQR!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

