const express = require("express");

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

app.listen(8080, () => {
	console.log("Server is up on the port 8080");
});