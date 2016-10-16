require('babel-register');
var babel=require('babel-core');
var expressHbs = require('express-handlebars');
var path = require('path');
var express = require('express')
var app = express()
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var components = require('./components/CommentBox.jsx')
var CommentBox = components.CommentBox;
//var CommentBox = React.createFactory(components.CommentBox)
var routes = require('./routes/index');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/components'))
app.use(express.static(__dirname + '/public'))

app.use('/', routes);

app.listen(3000, function() {
  console.log('Listening on port 3000...')
});
