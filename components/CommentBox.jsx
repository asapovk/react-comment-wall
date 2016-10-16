var React = require('react');

var author = '';

var CommentBox = React.createClass({
	getInitialState: function(){
  return {data: this.props.data};
	},

	handleCommentSubmit: function (comment) {

      var data =this.props.data;
			var newId = data.length + 1;

			comment.id = newId;
			data.unshift(comment);
			this.setState({data: data});
	},


  render: function() {

    author = this.props.author;
    return (
      <div className="commentBox">
        <h1>Hello, world! I am a CommentBox.</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} author={this.props.author}/>
		    <CommentList  data = {this.state.data}/>
      </div>
    );
  }
});


var CommentList = React.createClass({

  	render: function() {
     var data= this.props.data;
     var comments =[];
     for (var i=0; i<data.length; i++)
     {
       comments.push(<Comment key = {data[i].id} author = {data[i].author}  text = {data[i].text} nestedComments= {data[i].nestedComments}/>);
     }

    	return (
	      <div className="commentList">
	        Hello, world! I am a CommentList.
	        	{comments}
	      </div>
    	);
  }
});


var Comment = React.createClass({
  getInitialState: function(){
    return {showComment: false, nestedComments: this.props.nestedComments};
  },
//////
  handleNestedCommentSubmit: function (comment) {

      this.setState({ showComment: !this.state.showComment });
      var nestedComments = this.props.nestedComments;
			var newId = nestedComments.length + 1;

			comment.id = newId;
			nestedComments.unshift(comment);
			this.setState({nestedComments: nestedComments});
	},
///////
  commentLink: function(e)
  {
    e.preventDefault();
    this.setState({ showComment: !this.state.showComment });
    this.renderCommentForm();
  },

  renderCommentForm: function()
  {
    if(this.state.showComment)
    {
      return (<CommentForm onCommentSubmit={this.handleNestedCommentSubmit} author={author}/>)
    }
  },

  render: function() {
    return (

      <div className = "comment media">
      <a className="pull-left" href="#">
          <img className = "media-object" src="http://placehold.it/64x64" alt=""/>
      </a>
      <div className="media-body">
        <h2 className="commentAuthor media-heading">
          {this.props.author}
        </h2>
        <p>{this.props.text}</p>
        <a href="#" onClick = {this.commentLink}>Comment</a>
        <div className="media m-t-2">
          {this.renderCommentForm()}
        </div>
        <CommentList data = {this.props.nestedComments}/>
      </div>
      </div>


    );
  }
});





var CommentForm = React.createClass({

	getInitialState: function(){
		return {author: '', text: '' };
	},

	handleTextChange: function(e) {
		this.setState({text: e.target.value });
	},

	handleSubmit: function(e) {

		e.preventDefault();

		var author = this.props.author.trim();
		var text = this.state.text.trim();
    var nestedComments = [];

		if(!text ) {
			return;
		}

		this.setState({text: ''});
		this.props.onCommentSubmit({author: this.props.author, text: this.state.text, nestedComments: []});
	},

  	render: function() {
    	return (
        <div className="well">
        <h4>Leave a Comment:</h4>
      	<form className="commentForm"  onSubmit = {this.handleSubmit}>
        	<textarea rows="3" className="form-control"
        	placeholder="Enter your comment here"
        	value={this.state.text}
        	onChange={this.handleTextChange}/>
          <button type="submit" className="btn btn-primary">Submit</button>
      	</form>
        </div>
    	);
  	}
});





exports.CommentBox = CommentBox;
