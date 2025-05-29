const http = require("http");
require("dotenv").config();

const app = require("./app");

const { connectToMongoDB } = require("./services/mongo.js");
const { loadPlanetData } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectToMongoDB();
  await loadPlanetData();
  await loadLaunchesData();
  server.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`);
  });
}
startServer();
