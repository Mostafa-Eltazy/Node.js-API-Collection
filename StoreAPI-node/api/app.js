require("dotenv").config();
require("express-async-errors")
const express = require("express");
const app = express();
const connectDB = require('./db/connect')
const productsRoutes = require('./routes/productsRoute')
const notFoundMiddleWare = require("./middleware/not-found");
const errorMiddleWare = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="api/v1/products">Products route</a>');
});

// product routes

app.use('/api/v1/products', productsRoutes)
app.use(notFoundMiddleWare)
app.use(errorMiddleWare)

const port =  process.env.PORT || 3000

const start = async()=>{

    try{
        //connect DB
        await connectDB(process.env.MONGO_URI)  
        app.listen(port, console.log(`The server is listening on port ${port}...`))

    } catch(error){

        console.log(`Something wnet wrong with the server :${error}`)
    }
}
start()
