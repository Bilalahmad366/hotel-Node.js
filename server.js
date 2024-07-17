const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config();
const db = require('./db');




const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('welcome to my server')
})

const personRoutes=require('./routes/personRoutes')
app.use('/person',personRoutes)

const menuRoutes=require('./routes/menuRoutes')
app.use('/menu',menuRoutes)

const port = 8000;
app.listen(port, () => {
  console.log("server is running ... ", port)
})