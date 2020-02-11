const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars and viewslocation to serve views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Hari Reddy'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Hari Reddy'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Hari Reddy'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            "error": "Provide address to get weather forecast!"
        });
    }
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecastData: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error!',
        author: 'Hari Reddy',
        errorMsg: 'Help Article Page Not Found!!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error!',
        author: 'Hari Reddy',
        errorMsg: 'Page Not Found!!'
    });
});

app.listen(port, () => {
    console.log('server is up and running at port ' + port);
});
