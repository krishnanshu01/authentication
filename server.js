const express = require('express');

const app = express();

const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const path = require('path');

connectDB();

app.use(express.json({extended : false}));  // to use body parser



app.use('/api/users' , require('./routes/api/users'))
app.use('/api/Auth' , require('./routes/api/auth'))
app.use('/api/product' , require('./routes/api/product'))



app.listen(PORT, () =>{
    console.log(`its working on port number ${PORT}`)
});