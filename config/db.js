const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
.then(() => console.log('Connected to DB'))
.catch(() => console.log('Not connected ..'))



