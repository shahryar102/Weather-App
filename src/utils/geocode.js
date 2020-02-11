const request = require('request');
const geocode = (address, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaGFyaXJlZGR5IiwiYSI6ImNqdXBzMnFpazAxbTM0NG55ajB2djdpajQifQ.Ko9_T8YF6xxGZRzhCoWjHg&limit=1`;

    request({ url: geoUrl, json: true}, (err, {body}) => {
        if (err) {
            callback(`Unale to connect! Check internet connectivity`, undefined);
        } else if (body.features.length === 0) {
            callback(`Unable to find location. Try another one!`, undefined);
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;