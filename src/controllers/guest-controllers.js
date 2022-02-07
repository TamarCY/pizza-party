const Guest = require("../models/guest");


const postGuest = async (req, res) => {
    const guest = new Guest(req.body);
    console.log("new guest:", guest);
    try {
      await guest.save();
      return res.status(201).send(guest);
    } catch (e) {
      return res.status(400).send({ error: e.message });
    }
  };



  module.exports = {postGuest}