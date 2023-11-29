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

const icons = importAll(require.context('../../../assets/icons', false, /\.svg$/));
const unitSystems = {
  metric: {
    temp: 'c',
    speed: 'kph',
    precipitation: 'mm',
    pressure: 'mb',
    distance: 'km',
  },
  imperial: {
    temp: 'f',
    speed: 'mph',
    precipitation: 'in',
    pressure: 'in',
    distance: 'miles',
  },
  get(key) {
    return this.unitSystem[key];
  },
  setIcon(key) {
    return icons.files[Object.keys(icons.files).find((iconKey) => iconKey.includes(key))];
  },
  roundValue(value) {
    return Math.round(value);
  },
  setValue(obj, ...args) {
    return this.roundValue(obj[`${args[0]}${this.get(args[1])}`]);
  },
};

const data = (state) => ({
  summary: {
    condition: {
      label: state.current.condition.text,
      icon: state.current.condition.icon,
      setText() {
        return `${this.label}`;
      },
    },
    temp: {
      unit: '°',
      value: state.setValue(state.current, 'temp_', 'temp'),
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
    feelslike: {
      unit: '°',
      value: state.setValue(state.current, 'feelslike_', 'temp'),
      label: 'feels like',
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
  },
  details: {
    minmaxtemp: {
      min: {
        value: state.setValue(state.forecast.forecastday[0].day, 'mintemp_', 'temp'),
        label: 'low',
      },
      max: {
        value: state.setValue(state.forecast.forecastday[0].day, 'maxtemp_', 'temp'),
        label: 'high',
      },
      unit: '°',
      label: `high / low`,
      icon: state.setIcon('minmaxtemp'),
      setText() {
        return `${this.max.value}${this.unit} / ${this.min.value}${this.unit}`;
      },
    },
    humidity: {
      value: state.current.humidity,
      unit: '%',
      label: 'humidity',
      icon: state.setIcon('humidity'),
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
    pressure: {
      value: state.setValue(state.current, 'pressure_', 'pressure'),
      unit: state.get('pressure'),
      label: 'pressure',
      icon: state.setIcon('pressure'),
      setText() {
        return `${this.value} ${this.unit}`;
      },
    },
    vis: {
      value: state.setValue(state.current, 'vis_', 'distance'),
      unit: state.get('distance'),
      label: 'visibility',
      icon: state.setIcon('visibility'),
      setText() {
        return `${this.value} ${this.unit}`;
      },
    },
    wind: {
      value: state.setValue(state.current, 'wind_', 'speed'),
      unit: state.get('speed'),
      label: 'wind',
      icon: state.setIcon('wind'),
      dir: {
        value: state.current.wind_dir,
      },
      setText() {
        return `${this.dir.value} ${this.value} ${this.unit}`;
      },
    },
    uv: {
      value: state.current.uv,
      label: 'UV Index',
      icon: state.setIcon('uv'),
      setText() {
        return `${this.value} of 11`;
      },
    },
  },
});

const todayController = {
  init(weatherData, unitSystem) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    const state = {
      get: unitSystems.get,
      setIcon: unitSystems.setIcon,
      setValue: unitSystems.setValue,
      roundValue: unitSystems.roundValue,
      unitSystem: unitSystems[unitSystem],
      ...weatherData,
    };
    return { ...data(state) };
  },
};

export default {
  init(weatherData, unitSystem, timeStamp) {
    // console.log(todayController.init(weatherData, unitSystem));
    console.log(weatherData);
    console.log(timeStamp);
    this.setProperties(todayController.init(weatherData, unitSystem));
  },
  setProperties(obj) {
    Object.assign(this, obj);
  },
};
