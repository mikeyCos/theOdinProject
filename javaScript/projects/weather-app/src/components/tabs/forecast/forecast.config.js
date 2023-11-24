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
  init(unitSystem, weatherData) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    this.findObjects = this.findObjects.bind(this);
    Object.keys(forecast).forEach(this.findObjects);
  },
  setValues(key, subKey, item) {
    if (item) {
      forecast[key].push(item);
    } else {
      forecast[key][subKey] = this.weatherData[key][subKey];
    }
  },
  findObjects(key) {
    if (!(forecast[key] instanceof Array)) {
      Object.keys(forecast[key]).forEach((subKey) => {
        this.setValues(key, subKey);
      });
    } else {
      this.weatherData.forecast[key].forEach((item) => {
        this.setValues(key, null, item);
      });
    }
  },
};

export default {
  init(unitSystem, weatherData) {
    forecastController.init(unitSystem, weatherData);
    this.setProperties();
  },
  setProperties() {
    Object.assign(this, { ...forecast }, { location: forecastController.weatherData.location });
  },
};
