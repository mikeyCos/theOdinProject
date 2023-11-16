export default {
  current: {
    last_updated: null,
  },
  location: {
    name: null,
  },
  hour: [],
};

// Date
// time | temp | condition | preciptation % | wind
// example
// 1:30 pm | 47° | Sunny | 1% | N 6 mph

// current.last_updated
// forecast.forecastday[0].hour.time |
//   forecast.forecastday[0].hour.temp_f |
//   forecast.forecastday[0].hour.condition.text |
//   forecast.forecastday[0].hour.chance_of_rain |
//   (forecast.forecastday[0].hour.wind_dir + forecast.forecastday[0].hour.wind_mph)
