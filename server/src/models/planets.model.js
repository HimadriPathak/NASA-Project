const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path"); // You are missing this import

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const habitablePlanet = [];

function loadPlanetData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (chunk) => {
        if (isHabitablePlanet(chunk)) {
          habitablePlanet.push(chunk);
        }
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (err) => {
        console.error(`Error reading file: ${err.message}`);
        reject(err);
      });
  });
}

function getAllPlanets(req, res) {
  return habitablePlanet;
}

module.exports = { loadPlanetData, getAllPlanets };
