const express = require("express");
require("./1.0.0/db/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const multerStore = require("./1.0.0/reuseCom/multerStore");
const cors = require("cors");
const app = express();
const mailSender = require("./1.0.0/reuseCom/mailSender");
app.use(cors());
dotenv.config();

app.use(bodyParser.json());

// mailSender();
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

app.use("/todo", require("./1.0.0/routes/todo.route"));
app.use("/blog", require("./1.0.0/routes/blog.routes"));
app.use(
  "/amazon",
  multerStore("uploads").single("productImg"),
  require("./1.0.0/routes/amazon.route")
);
app.use("/shortUrl", require("./1.0.0/routes/shortUrl.route"));
app.use("/folderCheck", require("./1.0.0/routes/folderCheck.route"));
app.use("/user", require("./1.0.0/routes/user.routes"));
app.use("/forgotPassword", require("./1.0.0/routes/forgotPassword.route"));

app.listen(process.env.PORT, () => {
  console.log(`port started at ${process.env.PORT}`);
});
