const express = require("express");
require("./1.0.0/db/db");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use("/todo", require("./1.0.0/routes/todo.route"));
app.use("/blog", require("./1.0.0/routes/blog.routes"));

app.listen(9999, () => {
  console.log("port started at 9999");
});


// mongodbatlas password
// rsfdIczVoaLremCf
// golesanket0
// mongodb+srv://golesanket0:rsfdIczVoaLremCf@cluster0.tsuudru.mongodb.net/Cluster0?retryWrites=true&w=majority