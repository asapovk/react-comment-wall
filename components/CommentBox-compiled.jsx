var React = require('react');

var author = '';

var CommentBox = React.createClass({
		displayName: 'CommentBox',

		getInitialState: function () {
				return { data: this.props.data };
		},

		handleCommentSubmit: function (comment) {

				var data = this.props.data;
				var newId = data.length + 1;

				comment.isUserThumbed = false;
				comment.thumbs = 0;
				comment.date = Date.now();
				comment.id = newId;
				data.unshift(comment);
				this.setState({ data: data });
		},

		render: function () {

				author = this.props.author;
				return React.createElement(
						'div',
						{ className: 'commentBox' },
						React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit, author: this.props.author }),
						React.createElement(CommentList, { data: this.state.data })
				);
		}
});

var CommentList = React.createClass({
		displayName: 'CommentList',


		render: function () {
				var data = this.props.data;
				var comments = [];
				for (var i = 0; i < data.length; i++) {
						comments.push(React.createElement(Comment, { key: data[i].id, author: data[i].author, text: data[i].text, date: data[i].date, isUserThumbed: data[i].isUserThumbed, thumbs: data[i].thumbs, nestedComments: data[i].nestedComments }));
				}

				return React.createElement(
						'div',
						{ className: 'commentList' },
						comments
				);
		}
});

var Comment = React.createClass({
		displayName: 'Comment',

		getInitialState: function () {
				return { isUserThumbed: this.props.isUserThumbed, thumbs: this.props.thumbs, text: this.props.text, editedComment: false, deletedComment: false, showComment: false, nestedComments: this.props.nestedComments };
		},

		thumbUp: function (e) {
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

		renderThumbUp: function () {
				if (this.state.isUserThumbed) {
						return React.createElement('i', { className: 'fa fa-thumbs-up', 'aria-hidden': 'true' });
				}
				return React.createElement('i', { className: 'fa fa-thumbs-o-up', 'aria-hidden': 'true' });
		},

		handleCommentDate(current, previous) {

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
		handleNestedCommentSubmit: function (comment) {

				this.setState({ showComment: !this.state.showComment });
				var nestedComments = this.props.nestedComments;
				var newId = nestedComments.length + 1;

				comment.isUserThumbed = false;
				comment.thumbs = 0;
				comment.date = Date.now();
				comment.id = newId;
				nestedComments.unshift(comment);
				this.setState({ nestedComments: nestedComments });
		},

		handleCommentDelete: function (e) {
				e.preventDefault();
				this.setState({ deletedComment: !this.state.deletedComment });
		},
		///////
		handleCommentEdit: function (e) {
				e.preventDefault();
				this.setState({ editedComment: !this.state.editedComment });
		},

		handleCommentEditSubmit: function (text) {
				this.setState({ text: text });
				this.setState({ editedComment: !this.state.editedComment });
		},

		commentLink: function (e) {
				e.preventDefault();
				this.setState({ showComment: !this.state.showComment });
				this.renderCommentForm();
		},

		renderCommentForm: function () {
				if (this.state.showComment) {
						return React.createElement(CommentForm, { onCommentSubmit: this.handleNestedCommentSubmit, author: author });
				}
		},

		renderEditDeleteButtons: function () {
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

		render: function () {
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
								React.createElement('img', { className: 'media-object', src: 'http://placehold.it/64x64', alt: '' })
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
								React.createElement(CommentList, { data: this.props.nestedComments })
						)
				);
		}
});

var EditForm = React.createClass({
		displayName: 'EditForm',

		getInitialState: function () {
				return { text: this.props.placeholder };
		},
		handleEditSubmit: function (e) {
				e.preventDefault();
				this.props.onCommentEdit(this.state.text);
		},

		handleTextChange: function (e) {
				this.setState({ text: e.target.value });
		},

		render: function () {
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


		getInitialState: function () {
				return { author: '', text: '' };
		},

		handleTextChange: function (e) {
				this.setState({ text: e.target.value });
		},

		handleSubmit: function (e) {

				e.preventDefault();

				var author = this.props.author.trim();
				var text = this.state.text.trim();
				var nestedComments = [];

				if (!text) {
						return;
				}

				this.setState({ text: '' });
				this.props.onCommentSubmit({ author: this.props.author, text: this.state.text, nestedComments: [] });
		},

		render: function () {
				return React.createElement(
						'div',
						{ className: 'well' },
						React.createElement(
								'h4',
								null,
								'Leave a Comment:'
						),
						React.createElement(
								'form',
								{ className: 'commentForm', onSubmit: this.handleSubmit },
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
										{ type: 'submit', className: 'btn btn-primary' },
										'Submit'
								)
						)
				);
		}
});

exports.CommentBox = CommentBox;
