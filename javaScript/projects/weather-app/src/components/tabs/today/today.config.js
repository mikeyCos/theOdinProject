import formatTime from '../../../helpers/formatTime';
import { unitSystem } from '../unitsystems';

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
  details: {
    header: [
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
        key: 'sunrise',
        value: formatTime(state.sunrise).toLowerCase(),
        label: 'sunrise',
        icon: state.setIcon('sunrise'),
        setText() {
          return `${this.value}`;
        },
      },
      {
        key: 'sunset',
        value: formatTime(state.sunset).toLowerCase(),
        label: 'sunset',
        icon: state.setIcon('sunset'),
        setText() {
          return `${this.value}`;
        },
      },
    ],
    body: [
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
  },
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
  init(weatherData) {
    this.weatherData = weatherData;
    const state = {
      ...unitSystem,
      ...weatherData.forecast.forecastday[0],
      ...weatherData.forecast.forecastday[0].astro,
      ...weatherData.current,
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
  init(weatherData, timeStamp) {
    console.log(timeStamp);
    this.setProperties(todayController.init(weatherData));
  },
  setProperties(obj) {
    Object.assign(this, obj);
  },
};
