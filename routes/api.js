import express from 'express';
import fetch from 'node-fetch';
import { logger } from '../logger.js';

var router = express.Router();

let memsourceURL = 'https://cloud.memsource.com/web/';

router.post('/login', (req, res, next) => {
  logger.debug({
    userName: req.body.userName, 
    password: req.body.password,
  }, `User is atemting to log-in with these credentials: userName=${req.body.userName} password=${req.body.password}`)
  
  let endpoint = 'api/v3/auth/login';

  let requestData = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  let loginURL = `${memsourceURL}${endpoint}?userName=${req.body.userName}&password=${req.body.password}`

  fetch(loginURL, requestData)
    .catch(err => {console.log('Fetch error', err)})
    .then(response => response.json())
    .then(result => {
      console.log('Vrátilo se', result);
      
      if(!result.token) {
        res.send({error: result.errorCode})
      }
      res.send({'token': result.token})
    });
});

// gets project list from Memsource API and returns it to requester
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
    .catch(err => {console.log('Fetch error', err)})
    .then(response => response.json())
    .then(result => {
      res.send({
        data: result.projects
      });    

    });  
});

export default router;
