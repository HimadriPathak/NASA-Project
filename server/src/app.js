const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const planetRouter = require("./routers/planets/planets.router");
const launchesRouter = require("./routers/launches/launches.router");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
app.use("/planets", planetRouter);
app.use("/launches", launchesRouter);

module.exports = app;
