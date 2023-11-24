import pubSub from './pubSub';
// use WeatherAPI
// https://www.weatherapi.com/docs/
// http://api.weatherapi.com/v1/current.json?key=84ac7310e56448a1896212731230611&q=London

export default async function getWeather(value) {
  // *note, value does NOT need to be evaluated before fetch
  // postal code, number or string
  // city, uppercase or lowercase;
  pubSub.publish('switchContent', 'loading');
  try {
    const response = await fetch(
      // static value
      // 'https://api.weatherapi.com/v1/current.json?key=84ac7310e56448a1896212731230611&q=London&days=1&aqi=no&alerts=no',
      // dynamic value
      `https://api.weatherapi.com/v1/forecast.json?key=84ac7310e56448a1896212731230611&q=${value}&days=3&aqi=no&alerts=no`,
      // error test
      // `https://api.weatherapi.com/v1/forecas.json?key=84ac7310e56448a1896212731230611&q=${value}&days=3&aqi=no&alerts=no`,
      { mode: 'cors' },
    );

    const weatherData = await response.json();
    // pubSub.publish('setWeather', weatherData);
    pubSub.publish(
      'switchContent',
      !response.ok ? Object.assign(response, weatherData) : weatherData,
    );
    // pubSub.publish('setWeather', !response.ok ? weatherData.error : weatherData);
    if (!response.ok) {
      throw new Error(`Code ${response.status}, ${weatherData.error.message}`);
    }

    // code below the if block will only run if there are no errors
    console.log(weatherData);

    // pubSub.publish('setWeather', weatherData);
  } catch (err) {
    console.log(err);
  }
}

pubSub.subscribe('getWeather', getWeather);
