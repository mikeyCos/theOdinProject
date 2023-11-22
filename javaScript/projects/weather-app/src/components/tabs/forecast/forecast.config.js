// forecastday.date |
//   (forecastday.day.maxtemp_f / forecastday.day.mintemp_f) |
//   forecastday.day.condition |
//   forecastday.day.daily_chance_of_rain |
//   wind?

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
    Object.keys(forecast).forEach((key) => {
      if (!(forecast[key] instanceof Array)) {
        Object.keys(forecast[key]).forEach((subKey) => {
          forecast[key][subKey] = weatherData[key][subKey];
        });
      } else {
        weatherData.forecast.forecastday.forEach((item) => {
          forecast.forecastday.push(item);
        });
      }
    });
  },
  setValues(key, obj, subKey) {},
  findObjects(key, obj) {},
};

export default {
  init(unitSystem, weatherData) {
    forecastController.init(unitSystem, weatherData);
    this.setProperties();
  },
  setProperties() {
    Object.assign(this, { data: forecast }, { location: forecastController.weatherData.location });
  },
};
