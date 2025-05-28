const http = require("http");
const app = require("./app");

const { connectToMongoDB } = require("./services/mongo.js");
const { loadPlanetData } = require("./models/planets.model");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectToMongoDB();
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`);
  });
}
startServer();
