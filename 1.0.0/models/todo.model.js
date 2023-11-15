const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, maxlength: 45, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});
const ToDO = mongoose.model("ToDO", todoSchema);

module.exports = ToDO;
