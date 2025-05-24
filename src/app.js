const express = require("express");
const planetRouter = require("./routers/planets/planets.router");
const app = express();
app.use(express.json());
app.use(planetRouter);
module.export = app;
