const jwt = require("jsonwebtoken")
const Party = require("../models/party")

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify (token, "ilovepizzasomuch")
        const party = await Party.findOne({ _id: decoded._id, "tokens.token":token })

        if (!party) {
            throw new Error()
        }
        req.token = token
        req.party = party
        next()
    } catch (e) {
        res.status(401).send({ error: "Please authenticate" })
    }
}

module.exports = auth