const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser")
const SpotifyWebApi = require('spotify-web-api-node')

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
    console.log('refresh hi');
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'd4a9c4fe9d174e7fbb9c7e12d05bdd4b',
        clientSecret: 'ede39677351646afa37fef954925e810',
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(
        (data) => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            })
        }).catch(() => {
            res.sendStatus(400);
        })
})

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'd4a9c4fe9d174e7fbb9c7e12d05bdd4b',
        clientSecret: 'ede39677351646afa37fef954925e810'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400)
    })
})

app.listen(3001);