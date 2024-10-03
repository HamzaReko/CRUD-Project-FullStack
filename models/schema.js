const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const username = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    telephone: String,
    age: Number,
    city: String,
    gender: String,
    country: String,
  },
  { timestamps: true }
);

const model1 = mongoose.model("Customer", username);

module.exports = model1;
