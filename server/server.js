require('dotenv').config()
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyWebApi =  require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.post("/login",(req,res) => {
    // console.log(req.body);
  const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        clientId : process.env.CLIENT_ID,
        clientSecret : process.env.CLIENT_SECRET,
        redirectUri : "http://localhost:3000/"
    })
    spotifyApi.authorizationCodeGrant(code).then(data => {res.json({
        accessToken : data.body.access_token,
        refreshToken : data.body.refresh_token,
        expiresIn : data.body.expires_in
    })},function(err){
        console.log("HElllo Wokrkd");
        console.log(err);
    })
})

app.post("/refreshToken",(req,res)=>  {
const refreshToken = req.body.refreshToken;

const spotifyApi = new SpotifyWebApi({
    clientId : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET,
    redirectUri : "http://localhost:3000/",
    refreshToken 
})
spotifyApi.refreshAccessToken().then(
    data => {res.json({
        accessToken : data.body.access_token,
        expiresIn : data.body.expires_in
    })},
    function(err) {
      console.log('Could not refresh access token', err);
    }
  );
})

app.listen(3001,function(){
    console.log("Server running on port 3001");
})