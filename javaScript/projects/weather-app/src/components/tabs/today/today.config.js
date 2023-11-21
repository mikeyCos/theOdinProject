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
      test() {
        console.log('bar');
      },
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
  init(unitSystem, weatherData) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    this.setProperties();
  },
  setValues() {
    // if (this.weatherData.current[key]) {
    //   value = this.weatherData.current[key];
    // } else if (this.weatherData.forecast.forecastday[0].day[key]) {
    //   value = this.weatherData.forecast.forecastday[0].day[key];
    // }
  },
  findObjects(key, obj) {
    let objects = [];

    if (Object.values(obj).find((item) => item instanceof Object && !(item instanceof Function))) {
      Object.entries(obj).forEach((item) => {
        if (item[1] instanceof Object && !(item[1] instanceof Function)) {
          objects = [...objects, { [`${item[0]}`]: item[1] }];
        }
      });
    } else {
      objects = { [`${key}`]: obj };
    }
    return objects;
  },
  setProperties() {
    // this is DISGUSTING
    const objData = {};
    const objTemp = {
      setText() {
        return `${this.value} ${this.unit}`;
      },
    };

    const objectProperties = Object.entries(unitSystems[this.unitSystem])
      .map(([key, obj]) => this.findObjects(key, obj))
      .flat(1);

    Object.values(objectProperties).forEach((obj) => {
      Object.entries(obj).forEach(([key, prop]) => {
        let value;
        const object = obj;
        if (this.weatherData.current[key]) {
          value = this.weatherData.current[key];
        } else if (this.weatherData.forecast.forecastday[0].day[key]) {
          value = this.weatherData.forecast.forecastday[0].day[key];
        }

        value = Number.isNaN(+value) ? value : Math.round(value);
        object[key].value = value;

        // if (!object.setText) {
        //   object[key].setText = objTemp.setText;
        // }
        Object.assign(objData, { [`${key}`]: obj[key] });
      });
    });

    // Object.entries(unitSystems[this.unitSystem]).forEach(([key, obj]) => {
    //   let value;
    //   if (
    //     Object.values(obj).find((item) => item instanceof Object && !(item instanceof Function))
    //   ) {
    //     Object.keys(obj).forEach((subKey) => {
    //       if (
    //         !(obj[subKey] instanceof Function) &&
    //         (this.weatherData.current[subKey] ||
    //           this.weatherData.forecast.forecastday[0].day[subKey])
    //       ) {
    //         if (this.weatherData.current[subKey]) {
    //           value = this.weatherData.current[subKey];
    //         } else if (this.weatherData.forecast.forecastday[0].day[subKey]) {
    //           value = this.weatherData.forecast.forecastday[0].day[subKey];
    //         }
    //         value = Number.isNaN(+value) ? value : Math.round(value);
    //         unitSystems[this.unitSystem][key][subKey].value = value;
    //         Object.assign(objData, { [`${key}`]: unitSystems[this.unitSystem][key] });
    //       }
    //     });
    //   } else {
    //     if (this.weatherData.current[key]) {
    //       value = this.weatherData.current[key];
    //     } else if (this.weatherData.forecast.forecastday[0].day[key]) {
    //       value = this.weatherData.forecast.forecastday[0].day[key];
    //     }

    //     value = Number.isNaN(+value) ? value : Math.round(value);
    //     unitSystems[this.unitSystem][key].value = value;
    //     if (!unitSystems[this.unitSystem][key].setText) {
    //       unitSystems[this.unitSystem][key].setText = objTemp.setText;
    //     }
    //     Object.assign(objData, { [`${key}`]: unitSystems[this.unitSystem][key] });
    //   }
    // });
    Object.assign(this, { data: objData }, { location: this.weatherData.location });
  },
};
