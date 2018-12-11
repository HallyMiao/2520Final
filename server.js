const express = require("express");
const hbs = require('hbs');
const bodyParser = require("body-parser");
const requests = require('request');

const port = process.env.PORT || 8080;

var app = express();

const weather = require('./weather.js');

var app = express();

hbs.registerPartials(__dirname + '/views/partial');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/img'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
	response.send(response.redirect('/main.html'));
});

app.get('/info', (request, response) => {
	response.send(response.redirect('/about.html'));
});

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'	
	})
});

app.post('/weather', (request, response) => {
	response.send(response.redirect(`/weather/${request.body.loc}`));
});

app.post('/image', (request, response) => {
	response.send(response.redirect(`/img/${request.body.loc}`));
})

app.get('/weather/:location', (request, response) => {
	weather.getAddress(request.params.location, (errorMessage, results) => {
	    if (errorMessage) {
	        response.send(errorMessage);
	    } else {
			weather.getWeather(results.long, results.lat, (errorMessage, weathers) => {
			    if (errorMessage) {
			        response.send(errorMessage);
			    } else {
				    response.render('weather.hbs', {
				    	'location': request.params.location,
				    	'high': `${weather.celsius(weathers[0].temperatureHigh)} C`,
				    	'low': `${weather.celsius(weathers[0].temperatureLow)} C`,
				    	'icon': weathers[0].icon
				    });
				}
			});
	    }
	});
});

app.get('/img/:type', (request, response) => {
    requests({
        url: `https://pixabay.com/api/?key=10968990-19f0f9f99bd3aaad45bc0635e&q=${request.params.type}&image_type=photo&pretty=true`,
        json: true
    }, (error, res, body) => {
        if (error) {
            callback('Error');
        } else {
        	response.render('images.hbs', {
        		'image1' : body.hits[0].largeImageURL,
        		'image2' : body.hits[1].largeImageURL,
        		'image3' : body.hits[2].largeImageURL,
        		'image4' : body.hits[3].largeImageURL,
        		'image5' : body.hits[4].largeImageURL
        	})
        }
    });	
})

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});

