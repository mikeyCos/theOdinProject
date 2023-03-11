const convertToCelsius = function(fahrenheit) {
// °C = (°F - 32) * (5 / 9) 
  return Math.round((fahrenheit - 32) * (5 / 9) * 10) / 10;
};

const convertToFahrenheit = function(celsius) {
// °F = (°C * (9 / 5)) + 32
  return Math.round(((celsius * (9 / 5)) + 32) * 10) / 10;
};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
