const validator = require("validator");


const validateSignUpData = async (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 2 || lastName.length > 50) {
    throw new Error("Name should not be greater than 50 and less than 2");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }

};


module.exports = {
  validateSignUpData,
}