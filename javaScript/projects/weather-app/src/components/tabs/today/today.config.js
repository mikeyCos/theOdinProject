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

const todayController = {
  init(unitSystem, weatherData) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    Object.entries(unitSystems[this.unitSystem]).forEach(([key, obj]) => {
      this.findObjects(key, obj);
    });
  },
  setValues(key, obj, subKey) {
    // sets value properties from 'this.weatherData...'
    // to respective 'unitSystems[this.unitSystem]' objects
    const objCopy = obj;
    const objData = {};
    const weatherDataCurrent = subKey
      ? this.weatherData.current[subKey]
      : this.weatherData.current[key];
    const weatherDataForecast = subKey
      ? this.weatherData.forecast.forecastday[0].day[subKey]
      : this.weatherData.forecast.forecastday[0].day[key];

    if (!subKey && !objCopy.setText) {
      const objTemp = {
        setText() {
          return `${this.value} ${this.unit}`;
        },
      };
      Object.assign(objCopy, objTemp);
    }

    let value = !weatherDataCurrent ? weatherDataForecast : weatherDataCurrent;
    value = Number.isNaN(+value) ? value : Math.round(value);
    objCopy.value = value;

    Object.assign(objData, { [`${key}`]: objCopy });
  },
  findObjects(key, obj) {
    // finds object properties only and calls 'this.setValues'
    if (Object.values(obj).find((item) => item instanceof Object && !(item instanceof Function))) {
      Object.entries(obj).forEach(([subKey, subObj]) => {
        if (subObj instanceof Object && !(subObj instanceof Function)) {
          this.setValues(key, subObj, subKey);
        }
      });
    } else {
      this.setValues(key, obj);
    }
  },
};

export default {
  init(unitSystem, weatherData) {
    todayController.init(unitSystem, weatherData);
    this.setProperties();
  },
  setProperties() {
    Object.assign(
      this,
      { data: unitSystems[todayController.unitSystem] },
      { location: todayController.weatherData.location },
    );
  },
};
