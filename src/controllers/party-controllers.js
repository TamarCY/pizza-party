const { getMaxListeners } = require("../models/party");
const Party = require("../models/party");
const Guest = require("../models/guest");

const getParty = async (req, res) => {
  res.send(req.party);
};
// TODO: ADD STATUS

const getPartyById = async (req, res) => {
  try {
    const party = await Party.findById({ _id: req.params.id });
    res.status(200).send(party);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getAllParties = async (req, res) => {
  try {
    const party = await Party.find();
    return res.status(200).send(party);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const postParty = async (req, res) => {
  const party = new Party(req.body);
  try {
    await party.save();
    const token = await party.generateAuthToken();
    return res.status(201).send({ party, token });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

const updateParty = async (req, res) => {
  try {
    const party = await Party.findOne({ email: req.body.email });
    party.address = req.body.address;
    party.date = req.body.date;
    // party.phone = req.body.phone;
    party.toppingOptions = req.body.toppingOptions;
    party.toppingsSelected = req.body.toppingsSelected;
    party.selectedDesserts = req.body.selectedDesserts;
    party.selectedDrinks = req.body.selectedDrinks;
    party.selectedCocktails = req.body.selectedCocktails;
    const response = await party.save();
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const signinParty = async (req, res) => {
  try {
    const party = await Party.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await party.generateAuthToken();
    res.status(200).send({ party, token });
  } catch (e) {
    res.status(400).send("login didn't work");
  }
};

const logoutParty = async (req, res) => {
  try {
    req.party.tokens = req.party.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.party.save();
    res.status(200).send("logged out");
  } catch (e) {
    res.status(500).send(e);
  }
};

const sumGuestsPizza = async (req, res) => {
  try {
    const ordersArray = await Guest.find({ owner: req.params.id });
    const partyObject = await Party.findById(req.params.id);
    const sumOfOrders = sumObjects(ordersArray);
    partyObject.sumOfPizzaOrders = sumOfOrders
    partyObject.totalPizzaNum = sumPizza(sumOfOrders);
    partyObject.save()
    // const partyObject = await Party.findOneAndUpdate({_id: req.params.id}, {sumOfPizzaOrders: allOrdersObject})
  res.status(200).send(partyObject);
  } catch (e) {
    res.status(400).send(e.message);
  }
};



// TODO: move to utils

const sumPizza = (abject) => {
  const valuesArray = Object.values(abject)
  const result = valuesArray.reduce((prev,curr) => prev + curr)
  return result
}

const sumObjects = (array) => {
  const objectArray = [];
  array.forEach((guest) => {
    objectArray.push(...guest.pizzasSelected);
  });
  const result = {};
  objectArray.forEach((object) => {
    if (!result[object.toppings]) {
      result[object.toppings] = object.amount;
    } else {
      result[object.toppings] += object.amount;
    }
  });
  return result;

  // [{topping: olives, amount: 2},{topping: olives, amount: 2},]
};


// const logoutAll = async (req, res) => {
//   try {
//     console.log(req.user);
//     req.user.tokens = [];
//     await req.user.save()
//     res.status(200).send("logged out all")
//   } catch (e) {
//     res.status(500).send()
//   }
// }

// const deleteUser = async (req, res) => {
//   try {
//       await req.user.remove()
//       res.send(req.user)
//   } catch (e) {
//       res.status(500).send()
//   }
// }

module.exports = {
  getParty,
  postParty,
  updateParty,
  signinParty,
  logoutParty,
  getAllParties,
  getPartyById,
  sumGuestsPizza
};
