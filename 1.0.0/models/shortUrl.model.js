const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortid = require("shortid");
const urlSchema = new Schema(
  {
    shortUrlId: {
      type: String,
    },
    originalUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

urlSchema.pre("save", function () {
  this.shortUrlId = shortid();
});

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
