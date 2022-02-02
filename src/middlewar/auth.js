const jwt = require("jsonwebtoken")
const Host = require("../models/host")

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify (token, "ilovepizzasomuch")
        const host = await Host.findOne({ _id: decoded._id, "tokens.token":token })

        if (!host) {
            throw new Error()
        }
        req.token = token
        req.host = host
        next()
    } catch (e) {
        res.status(401).send({ error: "Please authenticate" })
    }
}

module.exports = auth