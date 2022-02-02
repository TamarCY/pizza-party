const express = require(express);
const hostRouter = express.Router();
const auth = require("./middleware/auth");


hostRouter.get("/me", auth, getHost);
hostRouter.post("/", postHost);
hostRouter.post("login", loginHost);
hostRouter.post("logout", logoutHost);


module.exports = hostRouter
