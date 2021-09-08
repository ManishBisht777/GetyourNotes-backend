const connecttomongo = require("./db");

connecttomongo();

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// avalaible routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
