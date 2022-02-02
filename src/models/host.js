const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const toppingsOptions = ["pineapple", "olives", "onion"]

const hostSchema = new mongoose.Schema({
  name: {
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
  toppings: {
    type: [],
    default: toppingsOptions
  },
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
hostSchema.pre("save", async function (next) {
  const host = this;
  if (host.isModified("password")) {
    host.password = await bcrypt.hash(host.password, 8);
  }
  next();
});

hostSchema.methods.generateAuthToken = async function () {
  const host = this;
  const token = jwt.sign({ _id: host.id.toString() }, "eatpryloveisabook");
  host.tokens = host.tokens.concat({ token });
  await host.save();
  return token;
};

hostSchema.methods.toJSON = function () {
  const host = this;
  const hostObject = host.toObject();

  delete hostObject.password;
  delete hostObject.tokens;

  return hostObject;
};


hostSchema.statics.findByCredentials = async (email, password) => {
    const host = await host.findOne({ email })
    if(!host) {
        throw new Error("Unable to login")

    }
    const isMatch = await bcrypt.compare(password, host.password);
    if(!isMatch) {
        throw new Error("Unable to login")
    }
    return host
}

const Host = mongoose.model("Host", hostSchema);

module.exports = Host;