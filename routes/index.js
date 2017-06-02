import express from 'express';
import fetch from 'node-fetch';
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ "Test page": 'Nothing is he' });
});

export default router;
