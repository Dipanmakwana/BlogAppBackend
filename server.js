const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connect = require("./config/db.js");

// dotenv config
dotenv.config();

// routes
const userRoutes = require("./routes/userRoute.js");
const blogRoutes = require("./routes/blogRoutes.js");

connect();  

// rest object
const app = express();

// middelware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes   
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

// listening port
const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log("Listening at port no : ", port);
})