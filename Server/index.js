require('dotenv').config(); 
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require('body-parser');
const cors= require('cors');

const app = express();
connectDB();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 6006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
