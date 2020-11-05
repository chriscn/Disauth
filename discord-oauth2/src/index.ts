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
  if (req.params || req.query) {
    discordAuth.code.getToken(req.originalUrl).then(user => {
      var code = user;

      if(user.expired()) {
        user.refresh().then(newToken => {
          code = newToken;
        })
      }

      console.log(code)
      res.sendStatus(200)
    }).catch(error => {
      console.error(error)
      return res.redirect('/auth/discord')
    })
  } else {
    res.redirect('/auth/discord')
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
