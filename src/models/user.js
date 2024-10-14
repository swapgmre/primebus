const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,

  },
  lastName: {
    type: String,
    maxLength: 50,
  },

  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(`Invalid email addres:${value}`);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(`Invalid password: ${value}`);
      }
    },

  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    }
  },
  photoUrl: {
    type: String,
    default: "https://macromissionary.com/wp-content/uploads/2021/10/dummy-avatar-2.jpg",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error(`Invalid URL: ${value}`);
      }
    }
  }
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;  