const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");


    // res.bodyParser.cityName;



})

app.post("/", function (req, res) {

    const query = req.body.city;
    console.log(query);
    const apiId = "ccdc8d717adfb772f91f296f6cd1b27f";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiId + "&units=" + unit;
    

    https.get(url, function (response) {



        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const city = weatherData.name;
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            var style = "color:blue";
            var solid = " solid" + " black";
            var fsize = "text-align:center" + ";";
            res.write("<h1 style=" + style + ";" + fsize + ">The temperature in your City: " + city + ", Temp: " + temp + "C");
            res.write("<p> description: " + description + ".</p>")
            res.write("<img src=" + imageUrl + ">")
            
           
            
            res.send();
        
        })
    });

    
})




app.listen(process.env.PORT || 3000, function () {
    console.log("Server started");
})