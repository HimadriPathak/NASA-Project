const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path"); // You are missing this import
const planets = require("./planets.mongo");

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

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
      .on("data", async (chunk) => {
        if (isHabitablePlanet(chunk)) {
          savePlanet(chunk);
        }
      })
      .on("end", async () => {
        const habitablePlanets = await planets.find(
          {},
          {
            _id: 0,
            __v: 0,
          }
        );
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      })
      .on("error", (err) => {
        console.error(`Error reading file: ${err.message}`);
        reject(err);
      });
  });
}

async function getAllPlanets(req, res) {
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    await planets.findOneAndUpdate(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`Could not save planet ${planet.kepler_name}: ${error}`);
  }
}

module.exports = { loadPlanetData, getAllPlanets };
