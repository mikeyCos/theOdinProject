// forecastday.date |
// (forecastday.day.maxtemp_f / forecastday.day.mintemp_f)
// forecastday.day.condition
// forecastday.day.daily_chance_of_rain |
// wind
// NW, NNW, N, NNE, NE
// ENE, E, ESE
// SE, SSE, S, SSW, SW
// WSW, W, WNW
const unitSystems = {
  imperial: [],
  metric: [],
};

const forecast = {
  current: {
    last_updated: null,
  },
  location: {
    name: null,
  },
  forecastday: [],
};

const forecastController = {
  init(unitSystem, weatherData) {},
  setValues(key, subKey, item) {},
  findObjects(key) {},
};

export default {
  init(unitSystem, weatherData) {},
  setProperties() {},
};
