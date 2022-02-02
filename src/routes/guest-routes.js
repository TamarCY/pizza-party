const express = require(express);
const guestRouter = express.Router();
const auth = require("./middleware/auth");


guestRouter.get("/me", auth, getHost);
guestRouter.post("/", postHost);
guestRouter.post("login", loginHost);
guestRouter.post("logout", logoutHost);


module.exports = guestRouter
