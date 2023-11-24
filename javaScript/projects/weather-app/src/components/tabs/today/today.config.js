// current.temp_f
// current.feelslike_f
// forecast.forecastday[0].day.maxtemp_f
// forecast.forecastday[0].day.mintemp_f
// current.humidity
// current.pressure_in
// current.vis_miles
// current.wind_mph
// current.wind_dir
import importAll from '../../../helpers/importAll';
const icons = importAll(require.context('../../../assets/icons', true, /\.svg$/));
const unitSystems = {
  imperial: {
    condition: {
      setText() {
        return `${this.text}`;
      },
    },
    temp_f: {
      unit: '°',
      // text: 'temperature',
    },
    feelslike_f: {
      unit: '°',
      text: 'feels like',
    },
    minmaxtemp: {
      maxtemp_f: {
        unit: '°',
        text: 'high',
      },
      mintemp_f: {
        unit: '°',
        text: 'low',
      },
      setLabel() {
        return `${this.maxtemp_f.text} / ${this.mintemp_f.text}`;
      },
      setText() {
        return `${this.maxtemp_f.value}° / ${this.mintemp_f.value}°`;
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
      unit: ' in',
      text: 'pressure',
    },
    vis_miles: {
      unit: ' mi',
      text: 'visibility',
    },
    wind: {
      text: 'wind',
      wind_mph: {
        unit: ' mph',
      },
      wind_dir: {},
      setText() {
        return `${this.wind_dir.value} ${this.wind_mph.value} ${this.wind_mph.unit}`;
      },
    },
    uv: {
      text: 'UV Index',
      setText() {
        return `${this.value} of 11`;
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
    console.log(key);
    console.log(obj);
    console.log(
      Object.keys(icons.files).find(
        (iconKey) => iconKey.includes(key) || iconKey.includes(obj.text),
      ),
    );

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
          return `${this.value}${this.unit}`;
        },
      };
      Object.assign(objCopy, objTemp);
    }

    let value = !weatherDataCurrent ? weatherDataForecast : weatherDataCurrent;
    value = Number.isNaN(+value) ? value : Math.round(value);
    if (!(value instanceof Object)) {
      objCopy.value = value;
    } else {
      console.log(value);
      Object.assign(objCopy, value);
    }

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
