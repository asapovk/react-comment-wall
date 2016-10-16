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

    comment.id = newId;
    data.unshift(comment);
    this.setState({ data: data });
  },

  render: function () {

    author = this.props.author;
    return React.createElement(
      'div',
      { className: 'commentBox' },
      React.createElement(
        'h1',
        null,
        'Hello, world! I am a CommentBox.'
      ),
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
      comments.push(React.createElement(Comment, { key: data[i].id, author: data[i].author, text: data[i].text, nestedComments: data[i].nestedComments }));
    }

    return React.createElement(
      'div',
      { className: 'commentList' },
      'Hello, world! I am a CommentList.',
      comments
    );
  }
});

var Comment = React.createClass({
  displayName: 'Comment',

  getInitialState: function () {
    return { showComment: false, nestedComments: this.props.nestedComments };
  },
  //////
  handleNestedCommentSubmit: function (comment) {

    this.setState({ showComment: !this.state.showComment });
    var nestedComments = this.props.nestedComments;
    var newId = nestedComments.length + 1;

    comment.id = newId;
    nestedComments.unshift(comment);
    this.setState({ nestedComments: nestedComments });
  },
  ///////
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

  render: function () {
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
        { className: 'media-body' },
        React.createElement(
          'h2',
          { className: 'commentAuthor media-heading' },
          this.props.author
        ),
        React.createElement(
          'p',
          null,
          this.props.text
        ),
        React.createElement(
          'a',
          { href: '#', onClick: this.commentLink },
          'Comment'
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
        React.createElement('textarea', { rows: '3', className: 'form-control',
          placeholder: 'Enter your comment here',
          value: this.state.text,
          onChange: this.handleTextChange }),
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
