const express = require("express");
const { sequelize } = require("./models");
const userRT = require("./routes/userRoute");
const taskRT = require("./routes/taskRoute");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let counter = 0;
app.use((req, res, next) => {
  console.log("Middleware called", counter++);
  next();
});

app.use("/user", userRT);
app.use("/task", taskRT);

app.get("/", (req, res) => {
  res.send("Hello! Use /user or /task for API endpoints (add / delete / update).");
});

sequelize.sync({ force: false }).then(() => console.log("Database synced")).catch((err) => console.error("Sync error", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
