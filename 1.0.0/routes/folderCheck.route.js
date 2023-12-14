const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", async (req, res) => {
  try {
    const data = fs.readdirSync("C://");
    console.log(data);
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = fs.readdirSync(`C://${id}`);
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:firstName/:secondName", async (req, res) => {
  const { firstName, secondName } = req.params;
  try {
    const data = fs.readdirSync(`C://${firstName}//${secondName}`);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
