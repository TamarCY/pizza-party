require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose")
const partyRouter = require("./routes/party-routes")
// const guestRouter = require("./routes/guest-routes")

const app = express();

const publicPath = path.join(__dirname, "../client/build");

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

const mongo_uri = process.env.MONGO_URI;

mongoose
  .connect(mongo_uri)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));


app.use("/party", partyRouter);
// app.use("/guest", guestRouter)


app.use("*", (req, res) => {
	res.sendFile(path.resolve(`${publicPath}/index.html`))
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));


 
