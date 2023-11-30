const express = require("express");
const Amazon = require("../models/amazon.model");
const router = express.Router();

router.post("/", (req, res) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    productImg: req.file.path,
    price: req.body.price,
  };
  const AmazonObj = new Amazon(data);
  console.log(req.body);
  AmazonObj.save()
    .then((result) => {
      res.status(200).send({ msg: "product Created", data: result });
    })
    .catch((err) => {
      res.status(500).send({ msg: "errr", data: err });
    });
});

router.get("/", (req, res) => {
  Amazon.find()
    .then((result) => {
      res.send({ msg: "ok", data: result });
    })
    .catch((err) => {
      res.send({ msg: "error", data: err });
    });
});
module.exports = router;
