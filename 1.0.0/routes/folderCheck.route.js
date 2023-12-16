const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
router.use("/static", express.static(path.join("C:/")));

router.get("/", async (req, res) => {
  console.log(req);
  const { name } = req.query;
  if (name) {
    const data = fs
      .readdirSync(path.join(`${process.env.DRIVE}:/`))
      .filter((val) => {
        return name == val;
      });
    res.sendFile(path.join(`${process.env.DRIVE}:/${data[0]}`));
  } else {
    try {
      const data = fs.readdirSync(path.join(`${process.env.DRIVE}:/`));
      res.status(200).send({ data });
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = fs.readdirSync(`${process.env.DRIVE}:/${id}`);
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:firstName/:secondName", async (req, res) => {
  const { firstName, secondName } = req.params;

  const directories = await fs
    .readdirSync(
      path.join(`${process.env.DRIVE}:/${firstName}/${secondName}`),
      {
        withFileTypes: true,
      }
    )
    .filter((dirent) => dirent.isDirectory())
    .map((dir) => dir.name);

  if (directories.length) {
    res.status(200).send({ data: directories, isDirectory: true });
  } else {
    const data = await fs.readdirSync(
      path.join(`${process.env.DRIVE}:/${firstName}/${secondName}`)
    );
    res.status(200).send({ data, isDirectory: false });
  }
});

module.exports = router;
