const request = require("request");

const token = "CAAMoDMGAW7cBAKGjBYbW2vUKq6uE515ZBFuJ5TvWILBbDyl7sC6mT4vIEmHIZCDOjhNYABqPa5O3nI9fiDxcDL40K0sXIWHf0ZBsBZBDHlpF4dL5MvZCSFy1mY4sGqoAWKzKsxDpldOH87cgtafrYgBUvLbCzHIyGtaZCWvZC53yaqxXS3sIhXOwdk08mzuHgLw7u9CjS53uAZDZD";

function send(sender, text) {
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

function configHorizontalView(spots) {
  const t = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: spots.map(spot => {
          return {
            title: spot.name,
            subtitle: new Array(Math.round(spot.rate)).fill(null).map(() => "★").join() + new Array(5 - Math.round(spot.rate)).fill(null).map(() => "☆").join(),
            image_url: spot.imageUrl,
            buttons: [
              {
                type: "web_url",
                title: "Detail",
                url: spot.googleMapUrl
              },
              {
                type: "postback",
                title: "Pick",
                payload: "PAYLOAD_ITEM_1"
              }
            ]
          };
        })
      }
    }
  };
  console.log(t);
  return t;
}

module.exports = { send, configHorizontalView };
