require('babel-register')({
  presets: ['es2015']
});


var React = require('react');
var ReactDOM = require('react-dom');

var component = require('../components/CommentBox-compiled.jsx');
var CommentBox = component.CommentBox;

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML)


import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import CommentBoxReducer from '../reducers/CommentBoxReducer'


let store = createStore(CommentBoxReducer);
render(
	<Provider store={store}>
		<CommentBox author="asapovk" data = {initialState}/>
	</Provider>, document.getElementById('react-root')
)



//ReactDOM.render(
//  <CommentBox author="asapovk" data = {initialState}/>,
//  document.getElementById('react-root')
//);
