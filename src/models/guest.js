const mongoose = require("mongoose");

const Guest = mongoose.model("Guest", {
  name: {
    type: String
  },
  phone: {
    type: String
  },
  guestNumber: {
    type: Number
  },
  pizzasSelected: [
    {
      toppings: {
        type: String
      },
      amount: {
        type: Number
      },
      id: {
        type: Number
      }
    }
  ],
  drinkSelected: {
    type: String
  },
  dessertSelected: {
    type: String
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Party"
  }
});

module.exports = Guest;
