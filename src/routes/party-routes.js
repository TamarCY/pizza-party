const express = require("express");
const partyRouter = express.Router();
const auth = require("../middleware/auth");
const {getParty, postParty, loginParty, logoutParty} = require("../controllers/party-controllers")


partyRouter.get("/me", auth, getParty);
partyRouter.post("/", postParty);
partyRouter.post("/login", loginParty);
partyRouter.post("/logout", logoutParty);


module.exports = partyRouter
