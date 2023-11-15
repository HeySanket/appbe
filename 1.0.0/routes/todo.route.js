const express = require("express");
const ToDo = require("../models/todo.model");
const router = express.Router();

router.post("/", (req, res) => {
  const todoObj = new ToDo(req.body);
  console.log(req.body);
  todoObj
    .save()
    .then((result) => {
      res.status(200).send({ msg: "ToDo Created", data: result });
    })
    .catch((err) => {
      res.status(500).send({ msg: "errr", data: err });
    });
});

router.get("/", (req, res) => {
  ToDo.find()
    .then((result) => {
      res.send({ msg: "ok", data: result });
    })
    .catch((err) => {
      res.send({ msg: "error", data: err });
    });
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const u = req.body;
  console.log(id, u);

  ToDo.updateOne({ _id: id }, u)
    .then((result) => {
      res.send({ msg: "ok", data: result });
    })
    .catch((err) => {
      res.send({ msg: "errr", data: err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  ToDo.findOne({ _id: id }, (err, result) => {
    if (err) {
      res.send({ msg: "err ala bhau", data: err });
    } else {
      res.send({ msg: "ok", data: result });
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  ToDo.findOneAndDelete({ _id: id })
    .then((result) => {
      res.send({ msg: "ok", data: result });
    })
    .catch((err) => {
      res.send({ msg: "error", data: err });
    });
});

module.exports = router;
