// forecastday.date |
// (forecastday.day.maxtemp_f
// forecastday.day.mintemp_f)
// forecastday.day.condition
// forecastday.day.daily_chance_of_rain |
// wind
// NW, NNW, N, NNE, NE
// ENE, E, ESE
// SE, SSE, S, SSW, SW
// WSW, W, WNW
// import importAll from '../../../helpers/importAll';
import formatTime from '../../../helpers/formatTime';
import formatDate from '../../../helpers/formatDate';
import unitSystems from '../unitsystems';

const data = (state) => [
  {
    key: 'name',
    value: state.date,
    setText() {
      return `${formatDate(this.value)}`;
    },
  },
  {
    key: 'minmaxtemp',
    min: {
      value: state.setValue(state, 'mintemp_', 'temp'),
      label: 'low',
    },
    max: {
      value: state.setValue(state, 'maxtemp_', 'temp'),
      label: 'high',
    },
    unit: '°',
    label: `high / low`,
    setText() {
      return `${this.max.value}${this.unit} / ${this.min.value}${this.unit}`;
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
  {
    key: 'precip',
    value: state.daily_chance_of_rain,
    unit: '%',
    icon: state.setIcon('rain'),
    setText() {
      return `${this.value}${this.unit}`;
    },
  },
];

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

const forecastController = {
  init(weatherData, unitSystem) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    this.setDay = this.setDay.bind(this);
    const forecastday = weatherData.forecast.forecastday.map(this.setDay);
    const state = {
      ...weatherData.location,
    };

    return {
      ...location(state),
      forecastday,
      last_updated: formatTime(weatherData.current.last_updated).toLowerCase(),
    };
  },
  setDay(obj) {
    const days = obj;
    const state = {
      icons: unitSystems.icons,
      get: unitSystems.get,
      setIcon: unitSystems.setIcon,
      setValue: unitSystems.setValue,
      roundValue: unitSystems.roundValue,
      unitSystem: unitSystems[this.unitSystem],
      ...obj.day,
      ...obj,
    };

    return { ...data(state) };
  },
};

export default {
  init(weatherData, unitSystem, timeStamp) {
    this.setProperties(forecastController.init(weatherData, unitSystem));
  },
  setProperties(obj) {
    Object.assign(this, obj);
  },
};
