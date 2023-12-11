# Readme
---
## Live preview: [Weather App](https://mikeycos.github.io/theOdinProject/javaScript/projects/weather-app/dist)
---
### Ideas
1. Calculate average wind speed and direction.
2. :heavy_check_mark: A way to toggle metric and imperial.
3. An ability to go re-render the home module.
4. Refactor unit system button to center text for before/after pseudo classes.
---
### Questions
1. Are API fields or object properties of the fetched data always need to be known before working with them? For example, `current.temp_f` or `forecast.forecastday[0].day.mintemp_f`. In other words, is it possible to work with an API's data without knowing their variable names?
---
### About
Project: Weather App

Hello world,

This weather app project was fun and interesting to work with an application programming interface (API); the weather API used: [Weather API](https://www.weatherapi.com/). It is fun being able to gather data from an outside source and render specific data values onto the DOM.

I over-engineered the project by creating a navigational bar for the header and content tabs and using a form of object state to return an object with specific properties. For this project I created directories for almost every JS module, for example, a folder for `forecast` and `forecast.config`.

One question I wanted to answer is "how can I get the most up-to-date data from the API and render that each time?" On my first attempt, I only had a clear idea of the question but no actual solution. I attempted to fetch data from the API each time a tab anchor is clicked on. Now, I was able to fetched the most up-to-date data, however, there was a problem with how I was re-rendering the 'newly' fetched data. The 'today' tab was re-rendered each time, no matter what tab anchor is clicked on. While trying to resolve the issue, I ran into another problem where object properties declared in the `tabs` module are lost, because the content exits `tabs`, then switches to the `loading` module and switches back to the `tabs` module when the data retrieval is completed. At this point, I was in despair and decided to restart the project at a certain point.

I knew this time, I needed a way to reference which tab was clicked on and pass it to the point when rendering tabs is happening. From afar, when a tabs anchor is clicked on, the `tabs` module publishes `'getWeather', this.location, renderKey` (renderKey is the clicked tab's anchor class name) to the `api_controller` module. Then the `api_controller` module publishes `'switchContent', weatherData, tabKey`. Then the `switchContent(weatherData, renderKey)` method in the `main` module will render the appropriate content, in this case, tabs will be rendered. Finally, the exported function from the `tabs` module will run `tabsBuilder.render(renderKey)` because a `renderKey` was initially passed when publishing 'getWeather'.

The unit systems button allows users to change from imperial to metric units or vice-versa. In order to achieve this, I created a `unitsystems` module that exports an object and function. The function will assign the selected unit system to the exported object. When the unit systems button is clicked, the `navbar` module publishes `'setUnitSystem', unitSystem`, then the `setUnitSystem(selection)` from the `header` module resubmits the form, then `setUnitSystem` from the `unitsystems` module runs and finally the `submitForm(e)` from the `header` module publishes `'getWeather', this.inputSearch.value, this.activeTab`. In short, when the unit systems button is clicked, the unit system is changed, the data is fetched from the API and rendered.

Currently, the last hour of the day does not render if the local date/time of the city/country is near the end of day. In other words, if the local time is 2300 or 11:00 PM then the forecast of that hour will not be added to it's respective object and therefore not rendered. Also, text in the unit systems button in the header's navigational bar are not centered with the green button.

To failing forward, cheers!

Live preview:
https://mikeycos.github.io/theOdinProject/javaScript/projects/weather-app/dist/

Repo:
https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/weather-app
