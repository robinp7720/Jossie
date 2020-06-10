import AccuWeather from 'accuweather';

const forecast = new AccuWeather('tcrBZkYUHhIA1PEblrsh1GwyGvXtFzG0');

export default {
     'rain': function (modifiers) {
         forecast
             .localkey(170335)
             .time('hourly/1hour')
             .language("en")
             .metric(true)
             .details(true)
             .get()
             .then(res => {
                 console.log(res)
             })
             .catch(err => {
                 console.log(err)
             });

         return ['maybe'];
    },
}
