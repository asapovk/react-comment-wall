
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



var data = {

  first:{

    id: 1,
    author: "Pete Hunt",
    text: "This is one comment",
    date: 0,
    thumbs: 3,
    isUserThumbed: false,
    nestedComments:
    {  first: {
        id: 101,
        author: "Jordan Walke",
        text: "This is *another* comment",
        date: 1,
        thumbs: 2,
        isUserThumbed: true,
        nestedComments: { first: {
            id: 1010,
            author: "Jordan Walke",
            text: "This is *another* comment",
            date: 4,
            thumbs: 2,
            isUserThumbed: false,
            nestedComments: {}
            }
          }
        }
    }
}
}



router.get('/', function(req, res){

  res.render('index', {
    //markup: ReactDOMServer.renderToString(CommentBox ({author: "asapovk", data: data})),
    markup: ReactDOMServer.renderToString(<CommentBox author = "asapovk" data= {data}/>),
    state: JSON.stringify(data)
  });
});


module.exports = router;
