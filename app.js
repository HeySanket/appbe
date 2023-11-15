const express = require("express");
require("./1.0.0/db/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var cors = require("cors");
const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json());

app.use("/todo", require("./1.0.0/routes/todo.route"));
app.use("/blog", require("./1.0.0/routes/blog.routes"));

app.listen(process.env.PORT, () => {
  console.log(`port started at ${process.env.PORT}`);
});

// mongodbatlas password
// rsfdIczVoaLremCf
// golesanket0
// mongodb+srv://golesanket0:rsfdIczVoaLremCf@cluster0.tsuudru.mongodb.net/Cluster0?retryWrites=true&w=majority
