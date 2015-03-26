module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send(JSON.parse(
    	[
        {
          "name": "One"
        },
        {
          "name": "Two"
        },
        {
          "name": "Three"
        },
                {
          "name": "Three!!!"
        }


      ]
    	));
  });
}