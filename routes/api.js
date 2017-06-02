import express from 'express';
import fetch from 'node-fetch';

import config from '../apiconfig.json';

var router = express.Router();

let memsourceURL = 'https://cloud.memsource.com/web/';

// gets project list from Memsource API and returns it to requester
router.get('/project', (req, res, next) => {
  let endpoint = 'api/v4/project/list';

  let requestData = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  }

  let requestURL = `${memsourceURL}${endpoint}?token=${req.APIToken}`

  fetch(requestURL, requestData)
    .catch(err => {console.log('Fetch error', err)})
    .then(response => response.json())
    .then(result => {
      res.send({
        data: result.projects
      });    

    });  
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
