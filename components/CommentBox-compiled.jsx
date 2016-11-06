'use strict';

var _reactRedux = require('react-redux');

require('babel-register')({
		presets: ['es2015']
});

var React = require('react');

var Hash = require('object-hash');

//import Comment  from './Comment.jsx';
//import CommentList from './CommentList.jsx';


var author = '';

var CommentBox = React.createClass({
		displayName: 'CommentBox',

		getInitialState: function getInitialState() {
				return { data: this.props.data, userPosted: 0, nestLevel: 1, closeSubmitForms: false };
		},

		handleCommentSubmit: function handleCommentSubmit(comment) {

				var hash = Hash(comment);

				var data = this.props.data;

				data[hash] = comment;
				this.setState({ data: data, userPosted: this.state.userPosted + 1 });
		},

		render: function render() {

				author = this.props.author;
				return React.createElement(
						'div',
						{ className: 'commentBox' },
						React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit, author: this.props.author, nestLevel: this.state.nestLevel }),
						React.createElement(CommentList, { data: this.state.data, nestLevel: this.state.nestLevel, userPosted: this.state.userPosted, closeSubmitForms: this.state.closeSubmitForms })
				);
		}
});

var EditForm = React.createClass({
		displayName: 'EditForm',

		getInitialState: function getInitialState() {
				return { text: this.props.placeholder };
		},
		handleEditSubmit: function handleEditSubmit(e) {
				e.preventDefault();
				//  this.props.onCommentEdit({id: Hash(Date.now()), date: Date.now(), isUserThumbed: false, tumbs:0, author: author, text: this.state.text, nestedComments: {}});
				this.props.onCommentEdit(this.state.text);
		},

		handleTextChange: function handleTextChange(e) {
				this.setState({ text: e.target.value });
		},

		render: function render() {
				return React.createElement(
						'form',
						{ className: 'commentForm', onSubmit: this.handleEditSubmit },
						React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement('textarea', { rows: '3', className: 'form-control',
										value: this.state.text,
										onChange: this.handleTextChange })
						),
						React.createElement(
								'button',
								{ type: 'submit', className: 'btn btn-primary' },
								'Submit'
						)
				);
		}

});

var CommentForm = React.createClass({
		displayName: 'CommentForm',


		getInitialState: function getInitialState() {
				return { author: '', text: '' };
		},

		handleTextChange: function handleTextChange(e) {
				this.setState({ text: e.target.value });
		},

		handleSubmit: function handleSubmit(e) {

				e.preventDefault();

				var author = this.props.author.trim();
				var text = this.state.text.trim();
				var nestedComments = [];

				if (!text) {
						return;
				}

				this.setState({ text: '' });
				this.props.onCommentSubmit({ id: Hash(Date.now()), date: Date.now(), thumbs: 0, isUserThumbed: false, author: this.props.author, text: this.state.text, nestedComments: {} });
		},

		renderAvatarPath: function renderAvatarPath() {
				if (this.props.nestLevel > 1) {
						return "images/user32.png";
				}
				return "images/user64.png";
		},

		render: function render() {
				return React.createElement(
						'div',
						{ className: 'well comment-form' },
						React.createElement(
								'div',
								{ className: 'row' },
								React.createElement(
										'div',
										{ className: 'col-md-1' },
										React.createElement('img', { className: 'media-object comment-form__avatar', src: this.renderAvatarPath(), alt: '' })
								),
								React.createElement(
										'div',
										{ className: 'col-md-11' },
										React.createElement(
												'form',
												{ className: 'commentForm comment-form__form', onSubmit: this.handleSubmit },
												React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement('textarea', { rows: '3', className: 'form-control',
																placeholder: 'Enter your comment here',
																value: this.state.text,
																onChange: this.handleTextChange })
												),
												React.createElement(
														'button',
														{ type: 'submit', className: 'btn btn-primary pull-right' },
														'Submit'
												)
										)
								)
						)
				);
		}
});

///////////////////////////////////////////////COMMENT LIST!!!
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
								wellClassName = '';
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
				if (this.props.nestLevel > 1) {
						for (var id in data) {
								var dataArray = data[id];
								comments.push(React.createElement(ReduxComment, { key: dataArray.id, onCloseOtherSumbitForms: true, showComment: this.props.closeSubmitForms, nestLevel: this.props.nestLevel, author: dataArray.author, text: dataArray.text, date: dataArray.date, isUserThumbed: dataArray.isUserThumbed, thumbs: dataArray.thumbs, nestedComments: dataArray.nestedComments }));
						}
						var commentsLength = comments.length;
						var CommentsToShow = comments.slice(commentsLength - limit - parseInt(this.props.userPosted));
				} else {
						for (var id in data) {
								var dataArray = data[id];
								comments.unshift(React.createElement(ReduxComment, { key: dataArray.id, onCloseOtherSumbitForms: true, showComment: this.props.closeSubmitForms, nestLevel: this.props.nestLevel, author: dataArray.author, text: dataArray.text, date: dataArray.date, isUserThumbed: dataArray.isUserThumbed, thumbs: dataArray.thumbs, nestedComments: dataArray.nestedComments }));
						}

						var commentsLength = comments.length;
						var CommentsToShow = comments.slice(0, limit + parseInt(this.props.userPosted));
						//CommentsToShow = comments.slice(0,10);
				}
				if (this.props.nestLevel > 1) {
						return React.createElement(
								'div',
								{ className: 'commentList' },
								this.renderShowMore(commentsLength - limit),
								CommentsToShow
						);
				} else {
						return React.createElement(
								'div',
								{ className: 'commentList' },
								CommentsToShow,
								this.renderShowMore(commentsLength - limit)
						);
				}
		}
});

///////////////////////////////////////////////////COMMENT!!!!


var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return { onCloseOtherSumbitForms: function onCloseOtherSumbitForms() {
						dispatch({ type: 'CLOSE_OTHERS' });
						console.log('dispatch works');
				}
		};
};

var mapStateToProps = function mapStateToProps(state) {
		console.log(state);
		return { showComment: state };
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
						//this.setState({showComment: nextProps.showComment});
						this.setState({ showComment: false });
				}
		},

		renderNestedComments: function renderNestedComments(nestedData) {
				return React.createElement(CommentList, { data: nestedData, nestLevel: this.props.nestLevel + 1, userPosted: this.state.userPosted, closeSubmitForms: this.state.closeSubmitForms });
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

						return React.createElement(CommentForm, { onCommentSubmit: this.handleNestedCommentSubmit, author: author, nestLevel: this.props.nestLevel });
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
								React.createElement(CommentList, { data: this.props.nestedComments })
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

var ReduxComment = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Comment);

exports.CommentBox = CommentBox;
