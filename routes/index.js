import express from 'express';
import fetch from 'node-fetch';
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ "Test page": 'test value' });
});

export default router;
