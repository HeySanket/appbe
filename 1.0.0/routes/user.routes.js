const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const mailSender = require("../reuseCom/mailSender");
const { createToken } = require("../reuseCom/jwdToken");
const { passBcrypt, passNcrypt } = require("../reuseCom/passwordBcrypt");

router.post("/", async (req, res) => {
  const { gmail, password, firstName, lastName } = req.body;
  const newPass = await passBcrypt(password);
  const dataObj = await new User({
    gmail,
    password: newPass,
    firstName,
    lastName,
  });
  const data = await dataObj.save();
  console.log(data, "data");
  try {
    const { gmail, _id } = data;
    res.set("x-token", createToken({ gmail, _id }));
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

    if (!passNcrypt(usePass, resPss)) {
      return res.status(500).send({ message: "Password incorect 1" });
    }
    if (ucerGmail != gmail) {
      return res.status(500).send({ message: "Gmail incorect" });
    }
    if (ucerGmail == gmail && passNcrypt(usePass, resPss)) {
      res.set("x-token", createToken({ ucerGmail, _id }));
      res.status(200).send(data);
    } else {
      res.status(500).send("err");
    }
  }
});

module.exports = router;
