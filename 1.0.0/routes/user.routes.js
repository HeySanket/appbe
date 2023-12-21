const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const mailSender = require("../reuseCom/mailSender");

router.post("/", async (req, res) => {
  const dataObj = await new User(req.body);
  console.log(req.body);
  const data = await dataObj.save();
  try {
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  const { gmail, forgot } = req.query;
  console.log(gmail, forgot);
  if (forgot) {
    console.log("moye moye");
    const data = await User.findOne({ gmail });
    console.log(data);
    mailSender(data.gmail);
    res.status(200).send(data);
  } else {
    const data = await User.findOne({ gmail });
    console.log(data, "else");
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(500).send("err");
    }
  }
});

module.exports = router;
