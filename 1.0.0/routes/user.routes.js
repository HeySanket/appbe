const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const mailSender = require("../reuseCom/mailSender");
const { createToken } = require("../reuseCom/jwdToken");

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
  const { gmail, forgot, password: usePass } = req.query;
  if (forgot) {
    const data = await User.findOne({ gmail });
    if (!data) {
      return res.status(500).send({ message: "Gmail incorect" });
    }
    mailSender(data.gmail);
    res.status(200).send(data);
  } else {
    const data = await User.findOne({ gmail });
    if (!data) {
      return res.status(500).send({ message: "Gmail incorect" });
    }
    const { gmail: ucerGmail, _id, password: resPss } = data;

    if (resPss != usePass) {
      return res.status(500).send({ message: "Password incorect" });
    }
    if (ucerGmail != gmail) {
      return res.status(500).send({ message: "Gmail incorect" });
    }
    if (ucerGmail == gmail && resPss == usePass) {
      res.set("x-token", createToken({ ucerGmail, _id }));
      res.status(200).send(data);
    } else {
      res.status(500).send("err");
    }
  }
});

module.exports = router;
