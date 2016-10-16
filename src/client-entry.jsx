var React = require('react');
var ReactDOM = require('react-dom');

var component = require('../components/CommentBox-compiled.jsx');
var CommentBox = component.CommentBox;

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML)

ReactDOM.render(
  <CommentBox author="asapovk" data = {initialState}/>,
  document.getElementById('react-root')
);
