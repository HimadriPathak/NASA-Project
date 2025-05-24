// const API_URL = "v1";
const BASE_URL = `http://localhost:8000`;
// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${BASE_URL}/planets`);
  if (!response.ok) {
    throw new Error("HTTP error " + response.status);
  }
  const planets = await response.json();
  return planets;
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${BASE_URL}/launches`);
  if (!response.ok) {
    throw new Error("HTTP error " + response.status);
  }
  const launches = await response.json();
  return launches.sort((a, b) => a.flightNumber - b.flightNumber);
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${BASE_URL}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ Critical
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${BASE_URL}/launches/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export { httpAbortLaunch, httpGetLaunches, httpGetPlanets, httpSubmitLaunch };
