const express = require("express");
const Party = require("../models/party");


const getParty = async (req, res) => {
  res.send(req.party)
}

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
      const token = await party.generateAuthToken()
    return res.status(201).send({ party, token });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};



const updateParty = async (req, res) => {
  const updates = Object.keys(req.body)
//   TODO: Add the categories that can be updated 
//   const allowedUpdates = ['name', 'email', 'password']
//   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//   if (!isValidOperation) {
//       return res.status(400).send({ error: 'Invalid updates!' })
//   }

  try {
      updates.forEach((update) => req.party[update] = req.body[update])
      await req.party.save()
      res.send(req.party)
  } catch (e) {
      res.status(400).send(e)
  }
}

const signinParty = async (req, res) => {
try {
  const party = await Party.findByCredentials(req.body.email, req.body.password)
  const token = await party.generateAuthToken();
  res.status(200).send({ party, token })
} catch (e) {
  res.status(400).send("login didn't work")
}
}

const logoutParty = async (req, res) => {
  try {
    req.party.tokens = req.party.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.party.save()
    res.status(200).send("logged out")
  } catch (e) {
    res.status(500).send()
  }
}

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


module.exports = { getParty, postParty, updateParty,
  signinParty, logoutParty, getAllParties};
