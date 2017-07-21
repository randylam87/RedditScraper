const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const path = require('path');
// const database = require("./models");

// Global Variables
const app = express();
const PORT = process.env.PORT || 8080;
//Public
app.use(express.static(path.join(__dirname, 'public')));
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));
// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Connect to database
// mongoose.connect('mongodb://localhost/articles');

require("./routes/api-routes.js")(app);
// Server on
app.listen(PORT, function (err) {
  if (!err)
    console.log(`Site is live on port: ${PORT}`);
  else console.log(err);
});