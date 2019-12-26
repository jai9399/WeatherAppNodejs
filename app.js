const request = require('request')
const express = require('express')
const app = express();
app.use(express.urlencoded());
app.use(express.static(__dirname+"/static"))
var input;
var string={
    run : "hi"
};
var lat;
var long;
app.get('/',function(req,res){
    res.sendFile(__dirname+"/static/try.html")
})
app.get('/send',function(req,response){
        var j;
        if(!req.query){
            return response.status(400).send('Provide a Valid address');
        }
        input = req.query.location;
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+input+".json?access_token=pk.eyJ1IjoiamFpOTM5OSIsImEiOiJjanpzbHpyc2QxOG45M2hvYmt6ZTNjc3JhIn0.hjWQ3S2gpBwF6qjlfwG4KQ"      
        request({url:url, json:true}, function(err,res){
            if(!res)
               return response.status(404).send('Bad Request')
            if(res.body == null)
               return response.status(404).send('Wrong Request')
            if(!res.body.features)
               return response.status(404).send('Invalid Query')
            if(res.body.features[0] == null){
               return response.status(404).send('Invalid Query')
            }
              long = res.body.features[0].center[0];
              lat = res.body.features[0].center[1];
              console.log(lat);
              console.log(long);
              const url2 = "https://api.darksky.net/forecast/1e191ab5baa1c34964c62b689a4ad34a/"+lat+","+long+"?units=si";
              console.log(url2);
              request({url:url2,json:true},function(err,res){
                console.log(res.body.timezone);
                console.log(res.body.hourly.data[0].summary)
                console.log(res.body.hourly.data[0].temperature)
                console.log(res.body.hourly.data[0].dewPoint)
                console.log(res.body.hourly.data[0].humidity)
                j = {
                timezone : res.body.timezone,   
                summary : res.body.hourly.data[0].summary,
                temperature : res.body.hourly.data[0].temperature,
                dewPoint : res.body.hourly.data[0].dewPoint,
                humidity : res.body.hourly.data[0].humidity
                }
                string = JSON.stringify(j)
                console.log(string);
                response.send(string);
            })   
            })
            
});
var j=0;
app.post('/current',function(req,res){
    console.log(req)
     const clat = req.body.lat;
     const clong = req.body.long;
     console.log(clat)
     let url="https://api.darksky.net/forecast/1e191ab5baa1c34964c62b689a4ad34a/"+clat+","+clong+"?units=si";
    request({url:url,json:true},function(err,res){
        console.log(res.body)
        j = {
        timezone : res.body.timezone,   
        summary : res.body.hourly.data[0].summary,
        temperature : res.body.hourly.data[0].temperature,
        dewPoint : res.body.hourly.data[0].dewPoint,
        humidity : res.body.hourly.data[0].humidity
        } 
}) })
app.get('/loc',function(req,response){
        response.send(j);
    })   
const port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log('Hi');
})

