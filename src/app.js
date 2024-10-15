const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");


app.use(express.json());

app.post("/signup", async (req, res) => {
  try {

    await validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;


    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, emailId, password: passwordHash })

    await user.save();
    res.send("User added Succesfully!!");
  } catch (err) {
    res.status(400).send(`ERROR ${err.message}`)
  };
});


app.post("/login", async (req, res) => {

  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Successfull!!!")
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send(`ERROR ${err.message}`)
  };

})


connectDB().then(() => {
  console.log("Database connection established");
  app.listen(7000, () => {
    console.log("Server is successfully running on PORT 7000");
  });
}).catch(err => {
  console.error("Databse cannot be established")
});

