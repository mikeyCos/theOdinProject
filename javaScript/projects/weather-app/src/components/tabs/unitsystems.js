import importAll from '../../helpers/importAll';

export const unitSystem = {
  icons: importAll(require.context('../../assets/icons', false, /\.svg$/)),
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
};

export function setUnitSystem(selection) {
  Object.assign(unitSystem, { unitSystem: unitSystems[selection] });
}
