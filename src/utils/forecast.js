const request = require('postman-request');
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d44c5eccde9a492bea6313a949858cf3&query=' + lat + ',' + long + '&units=f';
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the internet', undefined);
        }  else if (body && body.error) {
            callback('Unable to find the location', { error: 'Unable to find the location' });
        
        
        } else {
            const message = `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} fernite out. It feels like ${body.current.feelslike} out. The pressure is at ${body.current.pressure}`;
            callback(undefined, message);
        }
    });
}

module.exports = forecast;
