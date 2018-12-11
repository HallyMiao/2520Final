const express = require("express");
const hbs = require('hbs');

const port = process.env.PORT || 8080;

var app = express();

app.get('/', (request, response) => {
	response.render('about.hbs', {
		title: 'About Page',
		welcome: 'Hello!'
	});
});

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
});

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});