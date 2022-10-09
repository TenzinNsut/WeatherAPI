const express = require('express');
const bodyParser = require('body-parser');
// to get response form external server
const https = require('https');
const PORT = require('port');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) { 

    res.sendFile(__dirname+'/index.html')


    });



app.post('/', function (req, res) {
    // wrong
    // res.get(bodyParser.urlencoded({ extended: true }));
    
    const city = req.body.city ;
    const state = parseInt(req.body.state);
    const country = parseInt(req.body.country);
    const unit = req.body.unit;
    if (unit == 'metric') {
        var tunit = "Celsius";
    } else if (unit == "imperial") {
        var tunit = "Fahrenheit";
    }


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=c1d79bc81aa93ac69c22b48162dd2043&units=${unit}`;


    https.get(url, function (response) {
        response.on("data", function (data){
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const iconCode = weatherData.weather[0].icon;

            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


            res.write(`<body  style=" background-color: #282828;
            margin:0; padding:0; box-sizing: border-box;">`)
            res.write(`<h1 style="text-align: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 3.8rem;
            color: white;">Weather Data</h1>`);
            res.write(`<p style="text-align:center;color:white;">Temperature in ${city} is ${temp} degrees ${tunit}</p>`);
            res.write(`<img src="${iconUrl}" style="margin-left: 48%;">`);
            res.write(`<p style="margin-left:48%; color:white;">${desc}</p>`);

            res.send();


        });
    });
});



 const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})





