const express = require("express");
const router = express.Router();
const FB = require("fb");

function analysisPersonality(content, res) {
  res.send(content);
}

router.get("/me", (req, res) => {
  FB.api("/me", (fbResponse) => {
    console.log(fbResponse);
    FB.api(`${fbResponse.id}/posts`, (postRes) => {
      const content = postRes.data.map((val) => val.message).join(", ");
      analysisPersonality(content, res);
    });
  });
});

module.exports = router;
