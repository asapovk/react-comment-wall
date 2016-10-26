require('babel-register')({
  presets: ['es2015']
});

import {createStore} from 'redux';
import CommentBoxReducer from '../reducers/CommentBoxReducer'

var store = createStore(CommentBoxReducer);



exports.store = store;
