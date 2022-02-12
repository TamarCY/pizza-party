const express = require("express");
const guestRouter = express.Router();
const auth = require("../middleware/auth");
const {postGuest} = require ("../controllers/guest-controllers")


guestRouter.post("/", postGuest);



module.exports = guestRouter
