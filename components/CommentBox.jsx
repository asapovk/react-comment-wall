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
	        	{comments}
	      </div>
    	);
  }
});


var Comment = React.createClass({
  getInitialState: function(){
    return {text: this.props.text, editedComment: false, deletedComment: false, showComment: false, nestedComments: this.props.nestedComments};
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

  handleCommentDelete: function (e) {
    e.preventDefault();
    this.setState({deletedComment: !this.state.deletedComment});
  },
///////
  handleCommentEdit: function (e) {
    e.preventDefault();
    this.setState({editedComment: !this.state.editedComment});
  },

  handleCommentEditSubmit: function (text) {
    this.setState({text: text})
    this.setState({editedComment: !this.state.editedComment});
  },

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
    if (this.state.deletedComment) {
    return (
      <div className = "comment media">
      Comment has been deleted. <a href="#" onClick={this.handleCommentDelete}>Restore</a>
        <hr/>
      </div>

    );
    }

    if (this.state.editedComment){
    return (
      <div>
      <EditForm placeholder={this.state.text} onCommentEdit={this.handleCommentEditSubmit}/>
        <hr/>
        <CommentList data = {this.props.nestedComments}/>
      </div>
    );
    }



    return (

      <div className = "comment media">
      <a className="pull-left" href="#">
          <img className = "media-object" src="http://placehold.it/64x64" alt=""/>
      </a>
      <div className="media-body">
        <h2 className="commentAuthor media-heading">
          {this.props.author}
        </h2>
        <p>{this.state.text}</p>
        <div className="row">
          <div className="col-sm-1 pull-left">
            <a href="#" onClick = {this.commentLink} className="pull-left"><i className="fa fa-reply" aria-hidden="true"></i> Reply</a>
          </div>
          <div className="col-sm-1 pull-right">
            <a href="#" onClick = {this.handleCommentEdit} className="pull-right"><i className="fa fa-pencil" aria-hidden="true"></i> Edit</a>
          </div>
          <div className="col-sm-1 pull-right">
            <a href="#" onClick = {this.handleCommentDelete} className="pull-right"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</a>
            </div>
        </div>
        <div className="media m-t-2">
          {this.renderCommentForm()}
        </div>
        <hr/>
        <CommentList data = {this.props.nestedComments}/>
      </div>
      </div>


    );

  }
});


var EditForm = React.createClass({
  getInitialState: function () {
    return {text: this.props.placeholder}
  },
  handleEditSubmit: function (e){
    e.preventDefault();
    this.props.onCommentEdit(this.state.text);
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value });
  },

  render: function(){
    return (
      <form className="commentForm"  onSubmit = {this.handleEditSubmit}>
        <textarea rows="3" className="form-control"
        value={this.state.text}
        onChange={this.handleTextChange}/>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
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
