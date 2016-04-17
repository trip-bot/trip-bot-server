var express = require('express');
var router = express.Router();
const locationService = require("../services/locationService");

/* GET users listing. */
router.get('/', function(req, res, next) {
  locationService.getLocation((tags) => {
    res.send(tags);
  });
});

module.exports = router;
