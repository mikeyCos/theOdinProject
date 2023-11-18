// current.temp_f
// current.feelslike_f
// forecast.forecastday[0].day.maxtemp_f
// forecast.forecastday[0].day.mintemp_f
// current.humidity
// current.pressure_in
// current.vis_miles
// current.wind_mph
// current.wind_dir

const unitSystems = {
  imperial: {
    // temp_f: {
    //   unit: 'f',
    //   text: 'temperature',
    // },
    feelslike_f: {
      unit: 'f',
      text: 'feels like',
    },
    minmaxtemp_f: {
      maxtemp_f: {
        unit: 'f',
        text: 'high',
      },
      mintemp_f: {
        unit: 'f',
        text: 'low',
      },
      setLabel() {
        return `${this.maxtemp_f.text} / ${this.mintemp_f.text}`;
      },
      setText() {
        return `${this.maxtemp_f.value}${this.maxtemp_f.unit} / ${this.mintemp_f.value}${this.mintemp_f.unit} `;
      },
    },
    humidity: {
      text: 'humidity',
      humidity: {
        unit: '%',
      },
      setText() {
        return `${this.humidity.value}${this.humidity.unit}`;
      },
    },
    pressure_in: {
      unit: 'in',
      text: 'pressure',
    },
    vis_miles: {
      unit: 'mi',
      text: 'visibility',
    },
    wind: {
      text: 'wind',
      wind_mph: {
        unit: 'mph',
      },
      wind_dir: {},
      setText() {
        return `${this.wind_dir.value} ${this.wind_mph.value} ${this.wind_mph.unit}`;
      },
    },
  },
};

export default {
  setProperties(unitSystem, weatherData) {
    // this is DISGUSTING
    const objData = {};

    Object.entries(unitSystems[unitSystem]).forEach(([key, obj]) => {
      let value;
      if (!Object.values(obj).every((subObj) => !(subObj instanceof Object))) {
        Object.keys(obj).forEach((subKey) => {
          if (
            !(obj[subKey] instanceof Function) &&
            (weatherData.current[subKey] || weatherData.forecast.forecastday[0].day[subKey])
          ) {
            if (weatherData.current[subKey]) {
              value = weatherData.current[subKey];
            } else if (weatherData.forecast.forecastday[0].day[subKey]) {
              value = weatherData.forecast.forecastday[0].day[subKey];
            }
            value = Number.isNaN(+value) ? value : Math.round(value);
            unitSystems[unitSystem][key][subKey].value = value;
            Object.assign(objData, { [`${key}`]: unitSystems[unitSystem][key] });
          }
        });
      } else {
        const objTemp = {
          setText() {
            return `${this.value} ${this.unit}`;
          },
        };

        if (weatherData.current[key]) {
          value = weatherData.current[key];
        } else if (weatherData.forecast.forecastday[0].day[key]) {
          value = weatherData.forecast.forecastday[0].day[key];
        }

        value = Number.isNaN(+value) ? value : Math.round(value);
        unitSystems[unitSystem][key].value = value;
        if (!unitSystems[unitSystem][key].setText) {
          unitSystems[unitSystem][key].setText = objTemp.setText;
        }
        Object.assign(objData, { [`${key}`]: unitSystems[unitSystem][key] });
      }
    });
    Object.assign(this, { data: objData }, { location: weatherData.location });
  },
};
