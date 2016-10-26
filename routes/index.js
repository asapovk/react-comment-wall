require('babel-register')({
  presets: ['es2015']
});


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
        },
        second: {
           id: 102,
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
           },
           third: {
              id: 103,
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
},

    second:{

      id: 2,
      author: "Pete Hunt",
      text: "This is one comment",
      date: 0,
      thumbs: 3,
      isUserThumbed: false,
      nestedComments: {}

    },

    third:{

      id: 3,
      author: "Pete Hunt",
      text: "This is one comment",
      date: 0,
      thumbs: 3,
      isUserThumbed: false,
      nestedComments: {}

    },

    fourth:{

      id: 4,
      author: "Pete Hunt",
      text: "This is one comment",
      date: 0,
      thumbs: 3,
      isUserThumbed: false,
      nestedComments: {}

    },

    fifth:{

      id: 5,
      author: "Pete Hunt",
      text: "This is one comment",
      date: 0,
      thumbs: 3,
      isUserThumbed: false,
      nestedComments: {}

    },

    sixth:{

      id: 6,
      author: "Pete Hunt",
      text: "This is one comment Pre last commnet",
      date: 0,
      thumbs: 3,
      isUserThumbed: false,
      nestedComments: {}

    },

    seventh:{

      id: 7,
      author: "Pete Hunt",
      text: "This is one comment Last comment",
      date: 0,
      thumbs: 3,
      isUserThumbed: false,
      nestedComments: {
        first: {
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
            },
            second: {
               id: 102,
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
               },
               third: {
                  id: 103,
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

    },

}


//import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import CommentBoxReducer from '../reducers/CommentBoxReducer'



let store = createStore(CommentBoxReducer);

var PreProvider = React.createClass({
  render: function (){
    return (
      <Provider store ={store}>
    		<CommentBox author="asapovk" data = {data}/>
    	</Provider>
    );
  }

});









router.get('/', function(req, res){

  res.render('index', {
    //markup: ReactDOMServer.renderToString(CommentBox ({author: "asapovk", data: data})),
    markup: ReactDOMServer.renderToString(<PreProvider/>),
    state: JSON.stringify(data)
  });
});


module.exports = router;
