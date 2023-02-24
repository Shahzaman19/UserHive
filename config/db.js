const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
.then(() => console.log('Connected to DB'))
.catch(() => console.log('Not connected ..'))

mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
  });
  
mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
  });



