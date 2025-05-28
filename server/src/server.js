const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadPlanetData } = require("./models/planets.model");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
const MONGO_URL =
  "mongodb+srv://nasa_project_user:ccXvxvLuPP35Yu@nasa-cluster.skwd16y.mongodb.net/nasa?retryWrites=true&w=majority&appName=nasa-cluster";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

async function startServer() {
  mongoose.connect(MONGO_URL);
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`);
  });
}
startServer();
