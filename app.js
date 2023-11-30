const express = require("express");
require("./1.0.0/db/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var cors = require("cors");
const multer = require("multer");
const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

app.use("/todo", require("./1.0.0/routes/todo.route"));
app.use("/blog", require("./1.0.0/routes/blog.routes"));
app.use(
  "/amazon",
  upload.single("productImg"),
  require("./1.0.0/routes/amazon.route")
);

app.listen(process.env.PORT, () => {
  console.log(`port started at ${process.env.PORT}`);
});
