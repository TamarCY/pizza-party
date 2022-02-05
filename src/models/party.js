const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const toppingsOptions = ["pineapple", "olives", "onion"];

const partySchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    }
  },
  date: {
    type: Date
  },
  address: {
    type: String,
    default: ""
  },
  toppingOptions: {
    type: [String],
    default: toppingsOptions
  },
  toppingsSelected: {
    type: [Number]
    // TODO: add default value as 0 .... toppingsOptions.length
  },
  // TODO: change the toppings option and selected to arrays inside one toppings object
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// Hash the plain text password before saving
partySchema.pre("save", async function (next) {
  const party = this;
  if (party.isModified("password")) {
    party.password = await bcrypt.hash(party.password, 8);
  }
  next();
});

partySchema.methods.generateAuthToken = async function () {
  const party = this;
  const token = jwt.sign({ _id: party._id.toString() }, "ilovepizzasomuch");
  party.tokens = party.tokens.concat({ token });
  await party.save();
  return token;
};

partySchema.methods.toJSON = function () {
  const party = this;
  const partyObject = party.toObject();

  delete partyObject.password;
  delete partyObject.tokens;

  return partyObject;
};

partySchema.statics.findByCredentials = async (email, password) => {
  const party = await Party.findOne({ email });
  if (!party) {
    throw new Error("Unable to login - wrong email");
  }
  const isMatch = await bcrypt.compare(password, party.password);
  if (!isMatch) {
    throw new Error("Unable to login - wrong password");
  }
  return party;
};

const Party = mongoose.model("Party", partySchema);

module.exports = Party;
