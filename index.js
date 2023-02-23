const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const express = require('express')
const app = express()
app.use(express.json());
require('reflect-metadata');
require('dotenv').config();
const port = process.env.PORT || 3000

const users = require('./routes/userRoutes')
const auth = require('./routes/auth')
const countries = require('./routes/countriesRoutes')
const seeeders = require('./routes/seeding')

require('./config/db')

app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/countries', countries)
app.use('/api/seeders', seeeders)

app.listen(port, () => console.log(`Connected to ${port} ...`))



                        
 



