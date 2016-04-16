const express = require("express");
const request = require("request");
const router = express.Router();

const token = "CAAXZCwcSKm2gBADZBtFGFMXIE8IUiHm3N8D07d5UVHwkLZCRVG73J5Lbsq5hUh7Tm7XfvPg6ZCL0qagxZAVK9jxWPluXmoerhvylGYr9obXw9mEawk1n6IrEV7D7SqDv0td3gxhKBQU63hHDNE3Xxy3uudh4B4xaVuC6UfItZCcK5ZB1WjVx1Et0N5qunBwMQzob0d0j70DDQZDZD";

function sendTextMessage(sender, text) {
  const messageData = { text };
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: token },
    method: "POST",
    json: {
      recipient: { id: sender },
      message: messageData
    }
  }, (error, response) => {
    if (error) {
      console.log("Error sending message: ", error);
    } else if (response.body.error) {
      console.log("Error: ", response.body.error);
    }
  });
}

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
      const text = event.message.text;
      sendTextMessage(sender, `Text received, echo: ${text.substring(0, 200)}`);
    }
  });
  res.sendStatus(200);
});

module.exports = router;
