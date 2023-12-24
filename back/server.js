const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/firebaseConfig');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World from AppliPatientsQR!'));

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
