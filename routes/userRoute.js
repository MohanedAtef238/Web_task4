const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { Uname, Uage } = req.body;
    if (!Uname) return res.status(400).json({ error: "Missing user Info" });
    const user = await User.findOne({where: {name: Uname},});
    if (user) return res.status(404).json({ error: "User exists ya bashmohandes" }); // 400~ error signifying a bad request or missing parameters w keda
    const newUser = await User.create({name : Uname, age : Uage}); // documentation stuff  https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-insert-queries
    res.status(201).json(newUser); // status code for a completed process if i remember correctly
  } catch (err) {
    res.status(500).json({ error: err.message }); // means something broke in our server so we'd have to investigate the endpoints and server status instead of examining code semantics
  }
});
 // i only made this function since its cruical to add tasks they have to be linked to some kind of user :D 
module.exports = router;
