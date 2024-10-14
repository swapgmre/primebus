const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();


app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added Succesfully!!");
  } catch (err) {
    res.status(400).send(`Error saving the user: ${err.message}`)
  };
});


app.post("/login", async (req, res) => {

})


connectDB().then(() => {
  console.log("Database connection established");
  app.listen(7000, () => {
    console.log("Server is successfully running on PORT 7000");
  });
}).catch(err => {
  console.error("Databse cannot be established")
});

