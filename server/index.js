// Importing required modules
const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose')
const { mainRoutes } = require('./app/routes/mainRoutes');
require('dotenv').config();  // To load environment variables from .env file
const app = express(); // Creating an express application
app.use(cors())// Use CORS to allow cross-origin requests (you can configure more specific options here)
app.use(express.json()) 
const http = require('http');
const server = http.createServer(app);




process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use("/uploads/media",express.static("uploads/media"))
// Define a main route
app.use(mainRoutes)

// Set the port from environment variables or default to 3000
const port = process.env.PORT || 4000;

//for check in production
app.get("/", (req, res) => {
    res.send("✅ Backend is working!");
  });
  
// Start the server
mongoose.connect(`${process.env.DB_CONNECTION+process.env.DB_NAME}`)
.then(()=>{
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch(err=>{
    console.log(err)
})

