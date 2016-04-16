const express = require("express");
const request = require("request");
const router = express.Router();

const token = "CAAMoDMGAW7cBAKGjBYbW2vUKq6uE515ZBFuJ5TvWILBbDyl7sC6mT4vIEmHIZCDOjhNYABqPa5O3nI9fiDxcDL40K0sXIWHf0ZBsBZBDHlpF4dL5MvZCSFy1mY4sGqoAWKzKsxDpldOH87cgtafrYgBUvLbCzHIyGtaZCWvZC53yaqxXS3sIhXOwdk08mzuHgLw7u9CjS53uAZDZD";

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
      const text = `${event.message.text.substring(0, 200)}`;
      setTimeout(() => {
        sendTextMessage(sender, text);
      }, Math.max(0.5, text.length * 15));
    }
  });
  res.sendStatus(200);
});

module.exports = router;
