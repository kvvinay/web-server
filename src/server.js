const express = require('express');
const path = require('path')
const hbs = require('hbs')
const geo = require('./weather')


const app = express();
const port = process.env.PORT || 3000

const public = path.join(__dirname, '../public')
const hbsPath = path.join(__dirname, '../HBS/templates')
const partialsPath = path.join(__dirname, '../HBS/partials')

app.use(express.static(public))

app.set('view engine', 'hbs')
app.set('views', hbsPath)
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
    res.render('index', {
        title: 'This is Index page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is all about me...!'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Helping Page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404..! Page not found',
        ststus: 'there is no page for this'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.city){
        res.send({
            error:  'Have to provide the city name to featch the temperature'
        })
    }
    geo(req.query.city, (err, {tempp, place} = {}) => {
        if(err){
            return res.send({
                error: err,
                status: '404 '
            })    
        }
        res.send({
            Temperature: tempp,
            City: place
        })
        
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404..! Page not found',
        ststus: 'Not a help page'
    })
    
})








app.listen(port ,() => {
    console.log('Server is running @ 3000')
})