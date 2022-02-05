const express = require("express");
const partyRouter = express.Router();
const auth = require("../middleware/auth");
const {getParty, postParty, signinParty, logoutParty, updateParty, getPartyById} = require("../controllers/party-controllers")


partyRouter.get("/me", auth, getParty);
partyRouter.post("/signup", postParty);
partyRouter.post("/signin", signinParty);
partyRouter.post("/logout", logoutParty);
partyRouter.put("/edit", updateParty);
partyRouter.get("/invitation/:id", getPartyById)


module.exports = partyRouter
