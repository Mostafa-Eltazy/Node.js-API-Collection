const express = require("express");
const app = express();
const tasks = require("./routes/tasksRoute");
const { connectDB } = require("./db/connect");
require("dotenv").config();
const port = 3000;

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes

app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server is running on port ${port} ...`));
  } catch (error) {
    console.log("ERROR, server failure", error);
  }
};

start();
