export default {
  current: {
    last_updated: null,
  },
  location: {
    name: null,
  },
  forecastday: [],
};

// forecastday.date |
//   (forecastday.day.maxtemp_f / forecastday.day.mintemp_f) |
//   forecastday.day.condition |
//   forecastday.day.daily_chance_of_rain |
//   wind?
