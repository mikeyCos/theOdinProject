// current.last_updated
// forecast.forecastday[0].hour.time
// forecast.forecastday[0].hour.temp_f
// forecast.forecastday[0].hour.condition.text
// forecast.forecastday[0].hour.chance_of_rain
// (forecast.forecastday[0].hour.wind_dir
// forecast.forecastday[0].hour.wind_mph)

import importAll from '../../../helpers/importAll';
import formatTime from '../../../helpers/formatTime';

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

const data = (state) => [
  {
    name: 'time',
    value: state.time,
    setText() {
      return `${formatTime(this.value)}`;
    },
  },
  {
    name: 'temp',
    value: state.setValue(state, 'temp_', 'temp'),
    unit: '°',
    setText() {
      return `${this.value}${this.unit}`;
    },
  },
  {
    name: 'condition',
    label: state.condition.text,
    icon: state.condition.icon,
    setText() {
      return `${this.label}`;
    },
  },
  {
    name: 'precip',
    value: state.chance_of_rain,
    unit: '%',
    icon: state.setIcon('rain'),
    setText() {
      return `${this.value}${this.unit}`;
    },
  },
  {
    name: 'wind',
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
];

const date = (state) => ({
  date: state.date,
});

const location = (state) => ({
  location: {
    country: state.country,
    localtime: state.localtime,
    name: state.name,
    region: state.region,
    setText() {
      return `${this.name}, ${
        this.region.length === 0 || this.region === this.name ? this.country : this.region
      }`;
    },
  },
});

const hourlyController = {
  init(weatherData, unitSystem) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    this.setArray = this.setArray.bind(this);
    this.setHours = this.setHours.bind(this);
    const forecastday = weatherData.forecast.forecastday.map(this.setArray);
    console.log(forecastday);

    const state = {
      ...weatherData,
      ...weatherData.location,
    };
    console.log(state);
    return {
      ...location(state),
      forecastday,
      last_updated: formatTime(state.current.last_updated).toLowerCase(),
    };
  },
  setArray(obj) {
    const hours = obj.hour.reduce(this.setHours, []);
    console.log(hours);
    const state = {
      ...obj,
    };

    return { ...date(state), hours };
  },
  setHours(filtered, hour) {
    const date1 = new Date(this.weatherData.current.last_updated);
    const date2 = new Date(hour.time);

    if (date1.getTime() < date2.getTime()) {
      const state = {
        icons: unitSystems.icons,
        get: unitSystems.get,
        setIcon: unitSystems.setIcon,
        setValue: unitSystems.setValue,
        roundValue: unitSystems.roundValue,
        unitSystem: unitSystems[this.unitSystem],
        ...hour,
      };
      console.log(data(state));
      filtered.push({ ...data(state) });
    }

    return filtered;
  },
};

export default {
  init(weatherData, unitSystem, timeStamp) {
    this.setProperties(hourlyController.init(weatherData, unitSystem));
    console.log(weatherData);
    console.log(timeStamp);
    // this.setProperties(hourlyController.init(weatherData, unitSystem));
  },
  setProperties(obj) {
    Object.assign(this, obj);
  },
};
// Date
// time | temp | condition | preciptation % | wind
// example
// 1:30 pm | 47° | Sunny | 1% | N 6 mph
