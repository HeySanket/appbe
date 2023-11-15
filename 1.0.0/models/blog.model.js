const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, maxlength: 45, required: true },
  writer: { type: String, maxlength: 45, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});
const Bolg = mongoose.model("Blog", blogSchema);

module.exports = Bolg;
