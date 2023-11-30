const mongoose = require("mongoose");

const { Schema } = mongoose;

const amazonSchema = new Schema({
  title: String,
  description: String,
  productImg: String,
  price: Number,
});
const AmazonPro = mongoose.model("Amazon", amazonSchema);

module.exports = AmazonPro;
