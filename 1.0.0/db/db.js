const mongoose = require("mongoose");

const url =
  "mongodb+srv://golesanket0:rsfdIczVoaLremCf@cluster0.tsuudru.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on("open", () => {
  console.log("Connected to database unozap");
});

conn.on("error", () => {
  console.log("could not connected to the database unozap");
});


// mongodbatlas password
// rsfdIczVoaLremCf
// golesanket0
// mongodb+srv://golesanket0:rsfdIczVoaLremCf@cluster0.tsuudru.mongodb.net/Cluster0?retryWrites=true&w=majority