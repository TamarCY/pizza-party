const Guest = require("../models/guest");

const postGuest = async (req, res) => {
  const guest = new Guest(req.body);
  try {
    const result = await guest.save();
    return res.status(201).send(guest);
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

module.exports = { postGuest };
