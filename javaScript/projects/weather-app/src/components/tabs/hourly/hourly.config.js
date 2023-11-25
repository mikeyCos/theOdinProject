import importAll from '../../../helpers/importAll';

const icons = importAll(require.context('../../../assets/icons', false, /\.svg$/));

const unitSystems = {
  imperial: {
    current: {
      last_updated: null,
    },
    // location: {
    //   name: null,
    // },
    forecastday: [],
  },
};

const hourlyController = {
  init(unitSystem, weatherData) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    Object.entries(unitSystems[this.unitSystem]).forEach(([key, obj]) => {
      this.findObjects(key, obj);
      // this.setIcons(key, obj);
    });
  },
  setIcons() {},
  setValues(key, obj, subObj, subKey) {
    const date1 = new Date(unitSystems[this.unitSystem].current.last_updated);
    const date2 = new Date(obj.time);
    if (date1.getTime() < date2.getTime()) {
      const objTemp = {
        time: obj.time,
        temp_f: obj.temp_f,
        condition: {
          icon: obj.condition.icon,
          text: obj.condition.text,
        },
        chance_of_rain: {
          icon: null,
          unit: '%',
          value: obj.chance_of_rain,
        },
        wind: {
          icon: null,
          wind_dir: {
            value: obj.wind_dir,
          },
          wind_mph: {
            unit: 'mph',
            value: Math.round(obj.wind_mph),
          },
          setText() {
            return `${this.wind_dir.value} ${this.wind_mph.value} ${this.wind_mph.unit}`;
          },
        },
      };
      unitSystems[this.unitSystem][key].push(objTemp);
    }
  },
  findObjects(key, obj) {
    // console.log(key);
    // console.log(obj);
    if (!(obj instanceof Array)) {
      Object.keys(obj).forEach((subKey) => {
        obj[subKey] = this.weatherData[key][subKey];
      });
    } else {
      this.weatherData.forecast[key].forEach((day, i) => {
        day.hour.forEach((hourItem) => {
          this.setValues(key, hourItem);
          // console.log(Object.keys(item));
          // console.log(Object.keys(item).find((itemKey) => itemKey === 'time_epoch'));
        });
      });
      console.log(this.weatherData.forecast[key]);
      console.log(unitSystems[this.unitSystem][key]);
    }
    // Object.keys(hourly).forEach((key) => {
    //   if (!(hourly[key] instanceof Array)) {
    //     Object.keys(hourly[key]).forEach((subkey) => {
    //       hourly[key][subkey] = weatherData[key][subkey];
    //     });
    //   } else {
    //     weatherData.forecast[key].forEach((day, i) => {
    //       const date1 = new Date(hourly.current.last_updated);
    //       hourly[key] = weatherData.forecast[key];
    //       const newHours = day.hour.filter((hour) => {
    //         const date2 = new Date(hour.time);
    //         return date1.getTime() < date2.getTime();
    //       });
    //       hourly[key][i].hour = newHours;
    //     });
    //   }
    // });
  },
};

export default {
  init(unitSystem, weatherData) {
    hourlyController.init(unitSystem, weatherData);
    this.setProperties();
    console.log(this);
  },
  setProperties() {
    Object.assign(
      this,
      { data: unitSystems[hourlyController.unitSystem] },
      { location: hourlyController.weatherData.location },
    );
  },
};
// Date
// time | temp | condition | preciptation % | wind
// example
// 1:30 pm | 47° | Sunny | 1% | N 6 mph

// current.last_updated
// forecast.forecastday[0].hour.time |
//   forecast.forecastday[0].hour.temp_f |
//   forecast.forecastday[0].hour.condition.text |
//   forecast.forecastday[0].hour.chance_of_rain |
//   (forecast.forecastday[0].hour.wind_dir + forecast.forecastday[0].hour.wind_mph)
