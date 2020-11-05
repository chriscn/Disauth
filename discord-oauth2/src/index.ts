import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import axios from 'axios';
import ClientOAuth2 from 'client-oauth2';
import {PORT, OAUTH2_SECRET} from './config/constants'

const discordAuth = new ClientOAuth2({
  clientId: '773936911941238814',
  clientSecret: OAUTH2_SECRET,
  accessTokenUri: 'https://discord.com/api/oauth2/token',
  authorizationUri: 'https://discord.com/api/oauth2/authorize',
  redirectUri: 'http://localhost:3000/auth/discord/callback',
  scopes: ['identify', 'email']
})

const app = express()
app.use(morgan('common'))
app.use(helmet())

app.get('/auth/discord', (req, res) => {
  res.redirect(discordAuth.code.getUri())
})

app.get('/auth/discord/callback', (req, res) => {
  discordAuth.code.getToken(req.originalUrl)
    .then(user => {
      console.log(user)

      user.refresh().then(updatedUser => {
        console.log(updatedUser !== user) //=> true
        console.log(updatedUser.accessToken)
      });
    })

    res.send(200)
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
