const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

var port = process.env.PORT || 3000;


app.get("/",function(req,res){
    res.render("home");
})


app.post("/",function(req,res){
    const query = req.body.city;
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=ee32e545ca6fe4913433584698dd2135";
    
        https.get(url,function(response){
            console.log(response.statusCode);
    
            response.on("data",function(data){
                const weatherData = JSON.parse(data);
                console.log(weatherData.main.temp);
                res.render("details",{currentData : weatherData});
            
                //     const temp = weatherData.main.temp;
            //    res.send("<h1>The temperature in "+query+" is : "+temp+"</h1>");
                
            })
    
    
    });
    });
    
    




app.listen(port,function(){
    console.log("Server Started on Port 3000");
})
