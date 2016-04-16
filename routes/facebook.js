var express = require('express');
var router = express.Router();
var FB = require('fb');
router.get('/me', function (req, res) {
  res.send(FB.getAccessToken());
});

module.exports = router;
