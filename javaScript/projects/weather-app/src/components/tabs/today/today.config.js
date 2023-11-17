// export default [
//   {
//     temp_f: 'Temperature',
//     unit: '°F',
//   },
//   {
//     feelslike_f: 'Feels like',
//     unit: '°F',
//   },
//   {
//     maxtemp_f: 'High',
//     unit: '°F',
//   },
//   {
//     mintemp_f: 'Low',
//     unit: '°F',
//   },
//   {
//     humidity: 'Humidity',
//     unit: '%',
//   },
//   {
//     pressure_in: 'Pressure',
//     unit: 'in',
//   },
//   {
//     vis_miles: 'Visibility',
//     unit: 'mi',
//   },
//   {
//     wind_mph: 'Wind',
//     unit: 'mph',
//   },
//   // {
//   //   wind_degree: 'Wind degree',
//   // },
//   {
//     wind_dir: 'Wind direction',
//   },
// ];
const unitSystems = {
  imperial: {
    temp_f: {
      unit: 'f',
    },
    feelslike_f: {
      unit: 'f',
    },
    maxtemp_f: {
      unit: 'f',
    },
    mintemp_f: {
      unit: 'f',
    },
    humidity: {
      unit: '%',
    },
    pressure_in: {
      unit: 'in',
    },
    vis_miles: {
      unit: 'mi',
    },
    wind_mph: {
      unit: 'mph',
    },
    wind_dir: {},
  },

  metric: {
    temp_c: {
      unit: 'c',
    },
    feelslike_c: {
      unit: 'c',
    },
    maxtemp_c: {
      unit: 'c',
    },
    mintemp_c: {
      unit: 'c',
    },
    humidity: {
      unit: '%',
    },
    pressure_mb: {
      unit: 'mb',
    },
    vis_km: {
      unit: 'km',
    },
    wind_kph: {
      unit: 'kph',
    },
    wind_dir: {},
  },
};

export default {
  setProperties(unitSystem, weatherData) {
    const obj = {};
    console.log(unitSystems[unitSystem]);
    Object.keys(unitSystems[unitSystem]).forEach((key) => {
      console.log(key);
      let value;
      if (weatherData.current[key]) {
        value = weatherData.current[key];
      } else if (weatherData.forecast.forecastday[0].day[key]) {
        value = weatherData.forecast.forecastday[0].day[key];
      }
      value = Number.isNaN(+value) ? value : Math.round(value);
      unitSystems[unitSystem][key].value = value;
      console.log({ [`${key}`]: unitSystems[unitSystem][key] });
      Object.assign(obj, { [`${key}`]: unitSystems[unitSystem][key] });
    });
    console.log(obj);
    Object.assign(this, { data: obj }, { location: weatherData.location });
  },
};

// current.temp_f
// current.feelslike_f
// forecast.forecastday[0].day.maxtemp_f
// forecast.forecastday[0].day.mintemp_f
// current.humidity
// current.pressure_in
// current.vis_miles
// current.wind_mph
// current.wind_dir
