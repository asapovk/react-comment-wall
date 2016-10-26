'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CommentCompiled = require('./Comment-compiled.jsx');

var _CommentCompiled2 = _interopRequireDefault(_CommentCompiled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-register')({
	presets: ['es2015']
});

var author = "asapovk";
var React = require('react');

var CommentList = React.createClass({
	displayName: 'CommentList',


	getInitialState: function getInitialState() {
		if (this.props.nestLevel === 1) {
			return { commentsLimit: 5 };
		} else if (this.props.nestLevel === 2) {
			return { commentsLimit: 2 };
		} else {
			return { commentsLimit: 0 };
		}
	},

	//handleCloseOtherSubmitForms: function (){
	//	this.setState({closeSubmitForms: false});

	//	console.log('works');
	//},

	renderShowMore: function renderShowMore(restOfComments) {
		if (restOfComments > 0) {
			var word = "comments";
			var wellClassName = "well text-center";
			if (this.props.nestLevel > 1) {
				word = "replies";
				wellClassName = "text-center";
			}
			return React.createElement(
				'div',
				{ className: wellClassName },
				React.createElement(
					'a',
					{ href: '#', onClick: this.handleShowRestComments },
					React.createElement(
						'h4',
						null,
						'Show more ',
						word
					)
				)
			);
		}
	},

	handleShowRestComments: function handleShowRestComments(e) {
		e.preventDefault();
		this.setState({ commentsLimit: this.state.commentsLimit + 5 });
	},

	render: function render() {
		var data = this.props.data;
		var comments = [];
		var counter = 0;
		var limit = this.state.commentsLimit;
		for (var id in data) {
			var dataArray = data[id];
			comments.unshift(React.createElement(_CommentCompiled2.default, { key: dataArray.id, onCloseOtherSumbitForms: true, showComment: this.props.closeSubmitForms, nestLevel: this.props.nestLevel, author: dataArray.author, text: dataArray.text, date: dataArray.date, isUserThumbed: dataArray.isUserThumbed, thumbs: dataArray.thumbs, nestedComments: dataArray.nestedComments }));
		}
		var commentsLength = comments.length;
		var CommentsToShow = comments.slice(0, limit + parseInt(this.props.userPosted));
		//CommentsToShow = comments.slice(0,10);

		return React.createElement(
			'div',
			{ className: 'commentList' },
			CommentsToShow,
			this.renderShowMore(commentsLength - limit)
		);
	}
});

exports.default = CommentList;
