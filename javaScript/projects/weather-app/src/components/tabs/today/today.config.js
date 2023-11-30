// current.temp_f
// current.feelslike_f
// forecast.forecastday[0].day.maxtemp_f
// forecast.forecastday[0].day.mintemp_f
// current.humidity
// current.pressure_in
// current.vis_miles
// current.wind_mph
// current.wind_dir
import formatTime from '../../../helpers/formatTime';
import importAll from '../../../helpers/importAll';

const unitSystems = {
  icons: importAll(require.context('../../../assets/icons', false, /\.svg$/)),
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
    return this.icons.files[Object.keys(this.icons.files).find((iconKey) => iconKey.includes(key))];
  },
  roundValue(value) {
    return Math.round(value);
  },
  setValue(obj, ...args) {
    return this.roundValue(obj[`${args[0]}${this.get(args[1])}`]);
  },
};

const data = (state) => ({
  summary: [
    {
      key: 'temp',
      unit: '°',
      value: state.setValue(state, 'temp_', 'temp'),
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
    {
      key: 'condition',
      label: state.condition.text,
      icon: state.condition.icon,
      setText() {
        return `${this.label}`;
      },
    },
  ],
  details: [
    {
      key: 'feelslike',
      unit: '°',
      value: state.setValue(state, 'feelslike_', 'temp'),
      label: 'feels like',
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
    {
      key: 'minmaxtemp',
      min: {
        value: state.setValue(state.day, 'mintemp_', 'temp'),
        label: 'low',
      },
      max: {
        value: state.setValue(state.day, 'maxtemp_', 'temp'),
        label: 'high',
      },
      unit: '°',
      label: `high / low`,
      icon: state.setIcon('minmaxtemp'),
      setText() {
        return `${this.max.value}${this.unit} / ${this.min.value}${this.unit}`;
      },
    },
    {
      key: 'humidity',
      value: state.humidity,
      unit: '%',
      label: 'humidity',
      icon: state.setIcon('humidity'),
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
    {
      key: 'pressure',
      value: state.setValue(state, 'pressure_', 'pressure'),
      unit: state.get('pressure'),
      label: 'pressure',
      icon: state.setIcon('pressure'),
      setText() {
        return `${this.value} ${this.unit}`;
      },
    },
    {
      key: 'vis',
      value: state.setValue(state, 'vis_', 'distance'),
      unit: state.get('distance'),
      label: 'visibility',
      icon: state.setIcon('visibility'),
      setText() {
        return `${this.value} ${this.unit}`;
      },
    },
    {
      key: 'wind',
      value: state.setValue(state, 'wind_', 'speed'),
      unit: state.get('speed'),
      label: 'wind',
      icon: state.setIcon('wind'),
      dir: {
        value: state.wind_dir,
      },
      setText() {
        return `${this.dir.value} ${this.value} ${this.unit}`;
      },
    },
    {
      key: 'uv',
      value: state.uv,
      label: 'UV Index',
      icon: state.setIcon('uv'),
      setText() {
        return `${this.value} of 11`;
      },
    },
  ],
});

const location = (state) => ({
  country: state.country,
  localtime: state.localtime,
  name: state.name,
  region: state.region,
  setText() {
    return `${this.name}, ${
      this.region.length === 0 || this.region === this.name ? this.country : this.region
    }`;
  },
});

const todayController = {
  init(weatherData, unitSystem) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    const state = {
      icons: unitSystems.icons,
      get: unitSystems.get,
      setIcon: unitSystems.setIcon,
      setValue: unitSystems.setValue,
      roundValue: unitSystems.roundValue,
      unitSystem: unitSystems[unitSystem],
      ...weatherData.current,
      ...weatherData.forecast.forecastday[0],
      ...weatherData.location,
    };
    return {
      ...data(state),
      location: location(state),
      last_updated: formatTime(weatherData.current.last_updated).toLowerCase(),
    };
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
