import express from 'express';
import fetch from 'node-fetch';
import { logger } from '../logger.js';

var router = express.Router();

let memsourceURL = 'https://cloud.memsource.com/web/';

// logs user into memesource API and logs every log-in attempt to logs/debug.log
router.post('/login', (req, res, next) => {
  logger.debug({
    userName: req.body.userName, 
  }, `User is atemting to log-in with these credentials: userName=${req.body.userName}`)
  
  let endpoint = 'api/v3/auth/login';

  let requestData = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  let loginURL = `${memsourceURL}${endpoint}?userName=${req.body.userName}&password=${req.body.password}`

  fetch(loginURL, requestData)
    .catch(err => {logger.error({error: err})})
    .then(response => response.json())
    .then(result => {      
      if(!result.token) {
        res.send({error: result.errorCode})
      }
      res.send({'token': result.token})
    });
});

// gets project list from Memsource API and returns it to requester
// requires API token to be accesible in req obejct
router.post('/project', (req, res, next) => {
  let endpoint = 'api/v4/project/list';

  let requestData = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  }

  let requestURL = `${memsourceURL}${endpoint}?token=${req.body.token}`

  fetch(requestURL, requestData)
    .catch(err => {logger.error({error: err})})
    .then(response => response.json())
    .then(result => {
      res.send({
        data: result.projects
      });
    });  
});

export default router;
