const express = require("express");
const router = express.Router();
const FB = require("fb");

function analysisPersonality(content, res) {
  res.send(content);
}

router.get("/me", (req, res) => {
  FB.api("/me", (response) => {
    console.log(response);
    FB.api(`${response.id}/posts`, (resp) => {
      const content = resp.data.map((val) => val.message).join();
      analysisPersonality(content, res);
    });
  });
});

module.exports = router;
