const express = require("express");
const guestRouter = express.Router();
const auth = require("../middleware/auth");
const {postGuest} = require ("../controllers/guest-controllers")


// guestRouter.get("/me", auth, getGuest);
guestRouter.post("/", postGuest);
// guestRouter.post("login", loginGuest);
// guestRouter.post("logout", logoutGuest);


module.exports = guestRouter
