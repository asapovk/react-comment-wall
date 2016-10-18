
var expressHbs = require('express-handlebars');
var path = require('path');
var express = require('express')
var app = express()
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var components = require('../components/CommentBox.jsx')
var CommentBox = components.CommentBox;
//var CommentBox = React.createFactory(components.CommentBox)
var router = express.Router();

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment", date: 0, nestedComments: [{id: 3, author: "Pete Hunt", text: "This is one comment", date: 3, nestedComments: []}]},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment", date: 1, nestedComments: [{id: 4, author: "Jordan Walke", text: "This is *another* comment", date: 4, nestedComments: []}]}
];


router.get('/', function(req, res){
  res.render('index', {
    //markup: ReactDOMServer.renderToString(CommentBox ({author: "asapovk", data: data})),
    markup: ReactDOMServer.renderToString(<CommentBox author = "asapovk" data= {data}/>),
    state: JSON.stringify(data)
  });
});


module.exports = router;
