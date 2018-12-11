const request = require('request');

var getAddress = (address, callback) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCBCpIW67Nh1spM2W1LJypvrVGXnpcKtaY`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to Google Maps');
        } else if (body.status == 'ZERO_RESULTS') {
            callback('Cannot find request address');
        } else if (body.status == 'OK') {
            callback(undefined, {
                long: body.results[0].geometry.location.lat,
                lat: body.results[0].geometry.location.lng
            });
        }
    });
};

var getWeather = (long, lat, callback) => {
    request({
        url: `https://api.darksky.net/forecast/4d5d38c7f1a39eed47d812c791479a4a/${long},${lat}` ,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Cannot Connect');
        } else {
            try {
                callback(undefined, body.daily.data);
            }
            catch(err) {
                callback("No Data Found");
            }
        }
    });
};

var celsius = (temperature) => {
    return Math.round((temperature - 32) / 1.8)
}

module.exports = {
    getAddress,
    getWeather,
    celsius
};

// 4d5d38c7f1a39eed47d812c791479a4a