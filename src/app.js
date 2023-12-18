const path = require('path');
const express = require('express');
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const request=require('postman-request')
const app = express();
//define paths for express config
const publicIdDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // Agregamos esta línea para especificar la ubicación del directorio de vistas

const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); // Configuramos la ubicación del directorio de vistas
// setup static directory to serve
hbs.registerPartials(partialsPath)

app.use(express.static(publicIdDirectoryPath));

app.get('', (req, res) => {
  
    res.render('index', {
        title: 'Weather',
        name: 'Javier'
    });
});
app.get('/about', (req, res) => {
  
    res.render('about', {
        title: 'About me',
        name: 'Javier '
    });
});
app.get('/help', (req, res) => {
  
    res.render('help', {
        title: 'You need help ?',
        name: 'Javier'
    });
});


app.get('/Weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Debes proporcionar una dirección'
        });
    }


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log('Error', error);
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error);
            }

            console.log(location);
            console.log(forecastData);
            res.send([{
                address: req.query.address,
                weather: forecastData,
                location: location
                
            }]);
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send([{
        products: []
    }]);
});
app.get('/help/*',(req,res)=>{
    res.render('helpnf', {
        message: 'help page not found',
        title: 'Help not found',
        name: 'Javier'
    });
})


app.get('*',(req,res)=>{
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Javier'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
