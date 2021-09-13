const connecttomongo = require("./db");

connecttomongo();

const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// avalaible routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
