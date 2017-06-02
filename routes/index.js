import express from 'express';
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ "Test page": 'test value' });
});

export default router;
