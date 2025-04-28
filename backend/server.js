// server.js
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const tourismRoutes = require('./routes/tourism');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/tourism', tourismRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));