'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _CommentListCompiled = require('./CommentList-compiled.jsx');

var _CommentListCompiled2 = _interopRequireDefault(_CommentListCompiled);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-register')({
		presets: ['es2015']
});

var author = "asapovk";
var React = require('react');


var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		// return {onCloseOtherSumbitForms: () => {
		//   dispatch({type: 'CLOSE_OTHERS'})
		//   console.log('dispatch works');
		// }
		//}
};

var mapStateToProps = function mapStateToProps(state) {
		//  return {showComment: state}
};

var Comment = React.createClass({
		displayName: 'Comment',

		getInitialState: function getInitialState() {

				return { closeSubmitForms: false, userPosted: 0, isUserThumbed: this.props.isUserThumbed, thumbs: this.props.thumbs, text: this.props.text, editedComment: false, deletedComment: false, showComment: false, nestedComments: this.props.nestedComments };
		},

		shouldComponentUpdate: function shouldComponentUpdate() {

				return true;
		},

		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
				if (this.state.showComment) {
						this.setState({ showComment: nextProps.showComment });
				}
		},

		renderNestedComments: function renderNestedComments(nestedData) {
				return React.createElement(_CommentListCompiled2.default, { data: nestedData, nestLevel: this.props.nestLevel + 1, userPosted: this.state.userPosted, closeSubmitForms: this.state.closeSubmitForms });
		},

		componentDidMount: function componentDidMount() {
				this.setState({ nestedComments: this.props.nestedComments });
		},

		thumbUp: function thumbUp(e) {
				e.preventDefault();
				var thumbs = this.state.thumbs;
				if (this.state.isUserThumbed) {
						thumbs = thumbs - 1;
				} else {
						thumbs = thumbs + 1;
				}
				this.setState({ thumbs: thumbs });
				this.setState({ isUserThumbed: !this.state.isUserThumbed });
		},

		renderAvatarPath: function renderAvatarPath() {
				if (this.props.nestLevel > 1) {
						return "images/user32.png";
				}
				return "images/user64.png";
		},

		renderThumbUp: function renderThumbUp() {
				if (this.state.isUserThumbed) {
						return React.createElement('i', { className: 'fa fa-thumbs-up', 'aria-hidden': 'true' });
				}
				return React.createElement('i', { className: 'fa fa-thumbs-o-up', 'aria-hidden': 'true' });
		},

		handleCommentDate: function handleCommentDate(current, previous) {

				var msPerMinute = 60 * 1000;
				var msPerHour = msPerMinute * 60;
				var msPerDay = msPerHour * 24;
				var msPerMonth = msPerDay * 30;
				var msPerYear = msPerDay * 365;

				var elapsed = current - previous;

				if (elapsed <= 1000) {
						return 'Just now';
				} else if (elapsed < msPerMinute) {
						return Math.round(elapsed / 1000) + ' seconds ago';
				} else if (elapsed < 2 * msPerMinute) {
						return '1 minute ago';
				} else if (elapsed < msPerHour) {
						return Math.round(elapsed / msPerMinute) + ' minutes ago';
				} else if (elapsed < 2 * msPerHour) {
						return '1 hour ago';
				} else if (elapsed < msPerDay) {
						return Math.round(elapsed / msPerHour) + ' hours ago';
				} else if (elapsed < 2 * msPerDay) {
						return '1 day ago';
				} else if (elapsed < msPerMonth) {
						return Math.round(elapsed / msPerDay) + ' days ago';
				} else if (elapsed < 2 * msPerMonth) {
						return '1 mounth ago';
				} else if (elapsed < msPerYear) {
						return Math.round(elapsed / msPerMonth) + ' months ago';
				} else if (elapsed < 2 * msPerYear) {
						return '1 year ago';
				} else {
						return Math.round(elapsed / msPerYear) + ' years ago';
				}
		},
		//////
		handleNestedCommentSubmit: function handleNestedCommentSubmit(comment) {

				this.setState({ showComment: !this.state.showComment });
				var nestedComments = this.props.nestedComments;
				var hash = Hash(comment);

				nestedComments[hash] = comment;
				this.setState({ nestedComments: nestedComments, userPosted: this.state.userPosted + 1 });
		},

		handleCommentDelete: function handleCommentDelete(e) {
				e.preventDefault();

				this.setState({ deletedComment: !this.state.deletedComment });
		},
		///////
		handleCommentEdit: function handleCommentEdit(e) {
				e.preventDefault();
				this.setState({ editedComment: !this.state.editedComment });
		},

		handleCommentEditSubmit: function handleCommentEditSubmit(text) {
				this.setState({ text: text });
				this.setState({ editedComment: !this.state.editedComment });
		},

		commentLink: function commentLink(e) {
				e.preventDefault();
				this.setState({ showComment: !this.state.showComment });
				this.renderCommentForm();
				this.props.onCloseOtherSumbitForms();
		},

		renderCommentForm: function renderCommentForm() {
				if (this.state.showComment) {

						return React.createElement(CommentForm, { onCommentSubmit: this.handleNestedCommentSubmit, author: author });
				}
		},

		renderEditDeleteButtons: function renderEditDeleteButtons() {
				if (this.props.author === author) {
						return React.createElement(
								'div',
								{ className: 'col-sm-2 pull-right' },
								React.createElement(
										'div',
										{ className: 'row' },
										React.createElement(
												'div',
												{ className: 'col-sm-1' },
												React.createElement(
														'a',
														{ href: '#', onClick: this.handleCommentEdit },
														React.createElement('i', { className: 'fa fa-pencil', 'aria-hidden': 'true' })
												)
										),
										React.createElement(
												'div',
												{ className: 'col-sm-1' },
												React.createElement(
														'a',
														{ href: '#', onClick: this.handleCommentDelete },
														React.createElement('i', { className: 'fa fa-trash-o', 'aria-hidden': 'true' })
												)
										)
								)
						);
				}
		},

		render: function render() {
				if (this.state.deletedComment) {
						return React.createElement(
								'div',
								{ className: 'comment media' },
								'Comment has been deleted. ',
								React.createElement(
										'a',
										{ href: '#', onClick: this.handleCommentDelete },
										'Restore'
								),
								React.createElement('hr', null)
						);
				}

				if (this.state.editedComment) {
						return React.createElement(
								'div',
								null,
								React.createElement(EditForm, { placeholder: this.state.text, onCommentEdit: this.handleCommentEditSubmit }),
								React.createElement('hr', null),
								React.createElement(_CommentListCompiled2.default, { data: this.props.nestedComments })
						);
				}

				return React.createElement(
						'div',
						{ className: 'comment media' },
						React.createElement(
								'a',
								{ className: 'pull-left', href: '#' },
								React.createElement('img', { className: 'media-object', src: this.renderAvatarPath(), alt: '' })
						),
						React.createElement(
								'div',
								{ className: 'media-heading' },
								React.createElement(
										'h4',
										{ className: 'commentAuthor' },
										this.props.author,
										React.createElement(
												'small',
												null,
												' \xB7 ',
												this.handleCommentDate(Date.now(), this.props.date)
										)
								)
						),
						React.createElement(
								'div',
								{ className: 'media-body' },
								React.createElement(
										'p',
										null,
										this.state.text
								),
								React.createElement(
										'div',
										{ className: 'row' },
										React.createElement(
												'div',
												{ className: 'col-sm-2 pull-left' },
												React.createElement(
														'span',
														{ className: 'text-muted' },
														this.state.thumbs,
														' '
												),
												React.createElement(
														'a',
														{ href: '#', onClick: this.thumbUp },
														this.renderThumbUp()
												),
												React.createElement(
														'span',
														null,
														' \xB7 '
												),
												React.createElement(
														'a',
														{ href: '#', onClick: this.commentLink },
														'Reply'
												)
										),
										this.renderEditDeleteButtons()
								),
								React.createElement(
										'div',
										{ className: 'media m-t-2' },
										this.renderCommentForm()
								),
								this.renderNestedComments(this.state.nestedComments)
						)
				);
		}
});

var reduxComment = (0, _reactRedux.connect)(mapDispatchToProps, mapStateToProps)(Comment);

exports.default = reduxComment;
