const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/", async (req, res) => {
  const dataObj = await new User(req.body);
  const data = await dataObj.save();
  try {
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  const { gmail } = req.query;
  console.log(gmail);
  const data = await User.findOne({ gmail });
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(500).send("err");
  }
});

module.exports = router;
