const request = require('request')



const temp = (city, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=96e33ee13a4ed4511aeb048abc65cd03'
    request({url, json: true}, (error, response) => {
        if(error){
            callback('Weather server is not rechable', undefined)
        }else if(response.body.cod == 404){
            console.log(response.body.cod)
            callback('Please enter correct location', undefined)
        }else {
            console.log(response.body.cod)
            callback(undefined, {
            tempp: response.body.main.temp,
            place: response.body.name,
        })
        }
        
    })
}

module.exports = temp