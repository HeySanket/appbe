const express = require("express");
const router = express.Router();
const Url = require("../models/shortUrl.model");
router.post("/", async (req, res) => {
  try {
    const urlobj = await new Url(req.body);
    const data = await urlobj.save();
    res.status(201).send({ data });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  const { pageNumber } = req.query;
  console.log(pageNumber);
  try {
    const lastPage = Math.ceil((await Url.countDocuments()) / 5);
    const data = await Url.find({})
      .skip(pageNumber * 5 - 5)
      .limit(5);
    res.status(200).send({ data, lastPage });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Url.findOne({ shortUrlId: id });
    // res.status(200).send({ data });
    res.redirect(data.originalUrl);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = await Url.findByIdAndDelete({ _id: id });
  try {
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body, id);
  try {
    const data = await Url.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
