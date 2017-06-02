import express from 'express';
import fetch from 'node-fetch';

import config from '../apiconfig.json';

var router = express.Router();

let memsourceURL = 'https://cloud.memsource.com/web/';

router.get('/test', (req, res, next) => {

  res.send({"máme": req.APIToken});
});

// Logs into Memsource API, then stores acces token into req object
export function memsourceAPILoginMiddleware(req, res, next) {
  let endpoint = 'api/v3/auth/login';

  let requestData = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  let loginURL = `${memsourceURL}${endpoint}?userName=${config.userName}&password=${config.password}`

  fetch(loginURL, requestData)
    .catch(err => {console.log('Fetch error', err)})
    .then(response => response.json())
    .then(result => {
      req.APIToken = result.token;
      next();
    });
}

export default router;
