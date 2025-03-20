const express = require("express");
const { Task } = require("../models");
const { User } = require("../models");
// const { Task, User } = require("../models"); // for some reason kept glitching 🤷‍♂️
const router = express.Router();
// tried to add more validation as per the feedback i recieved before 🫡


router.get("/", async (req, res) => {
  try {
    const Tasks = await Task.findAll();
    res.json(Tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;


router.post("/add", async (req, res) => {
    try {
      const { T_name, description, user } = req.body;
      if (!T_name || !user) return res.status(400).json({ error: "Missing user Info and task name" });
      const UserID = await User.findOne({where: {name: user,},});
      if (!UserID) return res.status(404).json({ error: "User not found" }); // 400~ error signifying a bad request or missing parameters w keda
      const newTask = await Task.create({Tname : T_name, task_description : description, userID : UserID.userid }); // documentation stuff  https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-insert-queries
      res.status(201).json(newTask); // status code for a completed process if i remember correctly
    } catch (err) {
      res.status(500).json({ error: err.message }); // means something broke in our server so we'd have to investigate the endpoints and server status instead of examining code semantics
    }
  });

router.post("/delete", async (req, res) => {
    try {
      const { T_name, user } = req.body;
      if (!T_name || !user) return res.status(400).json({ error: "Missing user Info and task name" });
      const userr = await User.findOne({where: {name: user,},});
      if (!userr) return res.status(404).json({ error: "User not found" }); // 400~ error signifying a bad request or missing parameters w keda
      const task = await Task.findOne({where: {Tname: T_name, userID: userr.userid},});
      if (!task) return res.status(404).json({ error: "Task not found" }); 
      const done = await task.destroy()
      if (done) return res.status(201).send("SUCCESSFUL AWOOOOOO 🐺"); // status code for a completed process if i remember correctly
    } catch (err) {
      res.status(500).json({ error: err.message }); // means something broke in our server so we'd have to investigate the endpoints and server status instead of examining code semantics
    }
  });

router.patch("/update", async (req, res) => { // u can only update description otherwise it wont work
    try {
      const { T_name, user, update } = req.body;
      if (!T_name || !user) return res.status(400).json({ error: "Missing user Info and task name" });
      const userr = await User.findOne({where: {name: user,},});
      if (!userr) return res.status(404).json({ error: "User not found" }); // 400~ error signifying a bad request or missing parameters w keda
      const task = await Task.findOne({where: {Tname: T_name, userID: userr.userid},});
      if (!task) return res.status(404).json({ error: "Task not found" }); 
      if (!update) return res.status(404).json({error : "please provide an updated description"})
      const done = await task.update({task_description : update})
      if (done ) return res.status(201).send("SUCCESSFUL AWOOOOOO 🐺"); // status code for a completed process if i remember correctly
    } catch (err) {
      res.status(500).json({ error: err.message }); // means something broke in our server so we'd have to investigate the endpoints and server status instead of examining code semantics
    }
  });