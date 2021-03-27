//jshint esversion:6
require("dotenv").config();
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+ "/public"));

var url;
var json;
var query;

app.get("/", (req,res)=>{
    query = "love";

    url = "https://api.unsplash.com/search/photos/?query=" + query + "&client_id=" + process.env.UNSPLASH_ID ;

    https.get(url, function(response){

        var udata = "";

        response.on("data", (data)=>{
            udata += data;
        });

        response.on("end", ()=>{
            json = JSON.parse(udata);
        });
    });

    if(json.results[10] != undefined){
        setTimeout(() => {
            res.render("list", {json: json, query: query});
        }, 3000);
    } else {
        res.render("error");
    }    
});

app.post("/", (req,res)=>{
    query = req.body.photo;

    url = "https://api.unsplash.com/search/photos/?query=" + query + "&client_id=" + process.env.UNSPLASH_ID ;

    https.get(url, function(response){

        var udata = "";

        response.on("data", (data)=>{
            udata += data;
        });

        response.on("end", ()=>{
            json = JSON.parse(udata);
        });
    });

    if(json.results[10] != undefined){
        setTimeout(() => {
            res.render("list", {json: json, query: query});
        }, 3000);
    } else {
        res.render("error");
    }    
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});