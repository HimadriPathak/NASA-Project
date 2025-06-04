// const { describe, test } = require("node:test");
// const { deepStrictEqual } = require("node:assert");

const request = require("supertest");
const app = require("../../app");
const {
  connectToMongoDB,
  disconnectFromMongoDB,
} = require("../../services/mongo");
const { loadPlanetData } = require("../../models/planets.model");
describe("Launches API", () => {
  beforeAll(async () => {
    await connectToMongoDB();
    await loadPlanetData();
  });
  afterAll(async () => {
    await disconnectFromMongoDB();
  });
  describe("Test GET /launches", () => {
    test("it should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.statusCode).toBe(200);
    });
  });

  //SECTION - Node in-built test module
  // describe("Test POST /launch", () => {
  //   const completeLaunchData = {
  //     mission: "test",
  //     rocket: "test",
  //     launchDate: "January 4, 2028",
  //     target: "test",
  //   };

  //   const launchDataWithoutDate = {
  //     mission: "test",
  //     rocket: "test",
  //     target: "test",
  //   };
  //   test("it should respond with 201 success", async () => {
  //     const response = await request(app)
  //       .post("/launches")
  //       .send(completeLaunchData)
  //       .expect("Content-Type", /json/)
  //       .expect(201);
  //     const requestDate = new Date(completeLaunchData.launchDate).valueOf();
  //     const responseDate = new Date(response.body.launchDate).valueOf();
  //     deepStrictEqual(responseDate, requestDate);
  //     const { mission, target, rocket } = response.body;
  //     deepStrictEqual({ mission, target, rocket }, launchDataWithoutDate);
  //   });

  //   test("it should catch missing required properties", async () => {
  //     const response = await request(app)
  //       .post("/launches")
  //       .send(launchDataWithoutDate)
  //       .expect(400);
  //     deepStrictEqual(response.body, {
  //       error: "Missing required launch property",
  //     });
  //   });

  //   test("it should catch invalid dates", async () => {
  //     const response = await request(app)
  //       .post("/launches")
  //       .send({ ...completeLaunchData, launchDate: "hello" })
  //       .expect(400);
  //     deepStrictEqual(response.body, { error: "Invalid launch date" });
  //   });
  // });

  // SECTION - Jest & Supertest module
  describe("Test POST /launch", () => {
    const completeLaunchData = {
      mission: "test",
      rocket: "test",
      launchDate: "January 4, 2028",
      target: "Kepler-62 f",
    };

    const launchDataWithoutDate = {
      mission: "test",
      rocket: "test",
      target: "Kepler-62 f",
    };
    test("it should respond with 201 success", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("it should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("it should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({ ...completeLaunchData, launchDate: "hello" })
        .expect(400);

      expect(response.body).toStrictEqual({ error: "Invalid launch date" });
    });
  });
});
