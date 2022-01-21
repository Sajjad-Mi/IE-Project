const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');

const authRoutes  = require('./routes/auth');
const privateRoutes = require('./routes/private');

require('dotenv').config();

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(authRoutes);
app.use(privateRoutes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true})
.then(()=>{
  server.listen(PORT);
})