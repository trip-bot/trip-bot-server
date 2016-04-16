const express = require("express");
const messenger = require("../others/messenger");
const router = express.Router();

/* GET home page. */
// Index route
router.get("/", (req, res) => {
  res.send("Hello world, I am a chat bot");
});

// for Facebook verification
router.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === "my_voice_is_my_password_verify_me") {
      res.send(req.query["hub.challenge"]);
  }
  res.send("Error, wrong token");
});

router.post("/webhook/", (req, res) => {
  console.log(req.body.entry[0].messaging);
  req.body.entry[0].messaging.forEach(event => {
    const sender = event.sender.id;
    if (event.message && event.message.text) {
      const text = `${event.message.text.substring(0, 200)}`;
      setTimeout(() => {
        if (event.message.text === "Spots") {
          messenger.suggestSpots(sender);
        } else {
          messenger.send(sender, text);
        }
      }, Math.max(0.5, text.length * 15));
    } else if (event.postback) {
      const text2 = JSON.stringify(event.postback);
      messenger.send(sender, text2);
    }
  });
  res.sendStatus(200);
});

module.exports = router;
