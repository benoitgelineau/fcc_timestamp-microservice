// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint
app.get('/api/timestamp/:date_string?', (req, res, next) => {
    req.date_string = /\D/.test(req.params.date_string) ? req.params.date_string : parseInt(req.params.date_string);
    req.date = req.date_string ? new Date(req.date_string) : new Date();
    req.valid = req.date.getTime() ? true : false;
    next();
  }, (req, res) => {
    if (!req.valid) {
      res.json({ error: "Invalid Date" })
    } else {
      res.json({ unix: /\D/.test(req.date_string) ? req.date.getTime() : req.date_string, utc: req.date.toUTCString() })
    }
  }
);

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
