require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose")
const app = express();


const publicPath = path.join(__dirname, "../client/build");

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

const mongo_uri = process.env.MONGO_URI;

mongoose
  .connect(mongo_uri)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err))



app.use("*", (req, res) => {
	res.send("this route is not exist");
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is up and runging on ${PORT}`));


// Install mongoose 
// require mongoose
// add line 17 - mongoose connection 
