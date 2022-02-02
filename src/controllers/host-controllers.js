const express = require("express");
const Host = require("../models/host");


const getHost = async (req, res) => {
  res.send(req.host)
}

const getAllHosts = async (req, res) => {
  try {
    const host = await User.find();
    return res.status(200).send(host);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};


const postHost = async (req, res) => {
  const host = new Host(req.body);
  try {
    await host.save();
    const host = await host.generateAuthToken()
    return res.status(201).send({ host, token });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};



const updateHost = async (req, res) => {
  const updates = Object.keys(req.body)
//   TODO: Add the categories that can be updated 
//   const allowedUpdates = ['name', 'email', 'password']
//   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//   if (!isValidOperation) {
//       return res.status(400).send({ error: 'Invalid updates!' })
//   }

  try {
      updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      res.send(req.user)
  } catch (e) {
      res.status(400).send(e)
  }
}

const loginHost = async (req, res) => {
try {
  const host = await Host.findByCredentials(req.body.email, req.body.password)
  const token = await host.generateAuthToken();
  res.status(200).send({ host, token })
} catch (e) {
  res.status(400).send("login didn't work")
}
}

const logoutHost = async (req, res) => {
  try {
    req.host.tokens = req.host.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.host.save()
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


module.exports = { getHost, postHost, updateHost,
   loginHost, logoutHost, getAllHosts};
