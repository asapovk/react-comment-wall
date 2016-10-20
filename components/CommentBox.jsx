var React = require('react');

var Hash = require('object-hash');

var author = '';

var CommentBox = React.createClass({
	getInitialState: function(){
  return {data: this.props.data};
	},

	handleCommentSubmit: function (comment) {

			var hash = Hash(comment);

      var data =this.props.data;

			data[hash] = comment;
			this.setState({data: data});
	},


  render: function() {

    author = this.props.author;
    return (
      <div className="commentBox">
        <CommentForm onCommentSubmit={this.handleCommentSubmit} author={this.props.author}/>
		    <CommentList  data = {this.state.data} nestLevel="1"/>
      </div>
    );
  }
});


var CommentList = React.createClass({

  	render: function() {
    var data = this.props.data;
    var comments =[];
    for (var id in data)
     {
		   var dataArray = data[id];
       comments.unshift(<Comment key = {dataArray.id} nestLevel={this.props.nestLevel} author = {dataArray.author}  text = {dataArray.text} date={dataArray.date} isUserThumbed={dataArray.isUserThumbed} thumbs={dataArray.thumbs} nestedComments= {dataArray.nestedComments}/>);
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
    return {isUserThumbed: this.props.isUserThumbed, thumbs: this.props.thumbs, text: this.props.text, editedComment: false, deletedComment: false, showComment: false, nestedComments: this.props.nestedComments};
  },

	renderNestedComments: function (nestedData){
		return (<CommentList data = {nestedData} nestLevel={this.props.nestLevel + 1}/>);
	},


	componentDidMount: function (){
		this.setState({nestedComments: this.props.nestedComments});


	},


	thumbUp: function (e) {
		  e.preventDefault();
	 	  var thumbs =this.state.thumbs;
			if(this.state.isUserThumbed){
				thumbs=thumbs-1;
			}
			else {
				thumbs=thumbs+1;
			}
			this.setState({thumbs: thumbs});
			this.setState({isUserThumbed: !this.state.isUserThumbed})

	},

	renderAvatarPath: function (){
		if(this.props.nestLevel > 1) {
			return "images/user32.png";
		}
		return "images/user64.png";

	},

	renderThumbUp: function () {
		if(this.state.isUserThumbed){
			return (<i className="fa fa-thumbs-up" aria-hidden="true"></i>);
		}
		return (<i className="fa fa-thumbs-o-up" aria-hidden="true"></i>);
	},

	handleCommentDate(current, previous){

		var msPerMinute = 60 * 1000;
		var msPerHour = msPerMinute * 60;
		var msPerDay = msPerHour * 24;
		var msPerMonth = msPerDay * 30;
		var msPerYear = msPerDay * 365;

		var elapsed = current - previous;

		if (elapsed <= 1000) {
			return 'Just now'
		}

		else if (elapsed < msPerMinute) {
				 return Math.round(elapsed/1000) + ' seconds ago';
		}

		else if (elapsed < 2*msPerMinute) {
				 return  '1 minute ago';
		}

		else if (elapsed < msPerHour) {
				 return Math.round(elapsed/msPerMinute) + ' minutes ago';
		}

		else if (elapsed < 2*msPerHour) {
				 return '1 hour ago';
		}

		else if (elapsed < msPerDay ) {
				 return Math.round(elapsed/msPerHour ) + ' hours ago';
		}

		else if (elapsed < 2*msPerDay ) {
				 return '1 day ago';
		}

		else if (elapsed < msPerMonth) {
				return Math.round(elapsed/msPerDay) + ' days ago';
		}

		else if (elapsed < 2*msPerMonth) {
				return '1 mounth ago';
		}

		else if (elapsed < msPerYear) {
				return Math.round(elapsed/msPerMonth) + ' months ago';
		}

		else if (elapsed < 2*msPerYear) {
				return '1 year ago';
		}

		else {
				return  Math.round(elapsed/msPerYear ) + ' years ago';
		}

	},
//////
  handleNestedCommentSubmit: function (comment) {

      this.setState({ showComment: !this.state.showComment });
      var nestedComments = this.props.nestedComments;
			var hash = Hash(comment);


			nestedComments[hash] = comment;
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

  renderCommentForm: function()  {
    if(this.state.showComment){
      return (<CommentForm onCommentSubmit={this.handleNestedCommentSubmit} author={author}/>)
    }
  },

	renderEditDeleteButtons: function() {
		if (this.props.author === author){
			return (
			<div className="col-sm-2 pull-right">
			<div className="row">
			<div className="col-sm-1">
				<a href="#" onClick = {this.handleCommentEdit}><i className="fa fa-pencil" aria-hidden="true"></i></a>
			</div>
			<div className="col-sm-1">
				<a href="#" onClick = {this.handleCommentDelete}><i className="fa fa-trash-o" aria-hidden="true"></i></a>
			</div>
			</div>
			</div>
			);
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
          <img className = "media-object" src={this.renderAvatarPath()} alt=""/>
      </a>

			<div className="media-heading">
        <h4 className="commentAuthor">
          {this.props.author}
					<small> &middot; {this.handleCommentDate(Date.now(),this.props.date)}</small>
        </h4>
				</div>
				<div className="media-body">
        <p>{this.state.text}</p>
        <div className="row">
          <div className="col-sm-2 pull-left">
						<span className="text-muted">{this.state.thumbs} </span>
						<a href="#" onClick = {this.thumbUp}>{this.renderThumbUp()}</a>
						 <span> &middot; </span>
            <a href="#" onClick = {this.commentLink}>Reply</a>
          </div>
					{this.renderEditDeleteButtons()}
        </div>
        <div className="media m-t-2">
          {this.renderCommentForm()}
        </div>
				{this.renderNestedComments(this.state.nestedComments)}
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
    this.props.onCommentEdit({id: Hash(Date.now()), date: Date.now(), isUserThumbed: false, tumbs:0, author: author, text: this.state.text, nestedComments: {}});
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value });
  },

  render: function(){
    return (
      <form className="commentForm"  onSubmit = {this.handleEditSubmit}>
			<div className="form-group">
        <textarea rows="3" className="form-control"
        value={this.state.text}
        onChange={this.handleTextChange}/>
				</div>
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
		this.props.onCommentSubmit({id: Hash(Date.now()), date: Date.now() ,thumbs: 0, isUserThumbed: false, author: this.props.author, text: this.state.text, nestedComments: {}});
	},

  	render: function() {
    	return (
        <div className="well">
        <h4>Leave a Comment:</h4>
      	<form className="commentForm"  onSubmit = {this.handleSubmit}>
				<div className="form-group">
        	<textarea rows="3" className="form-control"
        	placeholder="Enter your comment here"
        	value={this.state.text}
        	onChange={this.handleTextChange}/>
					</div>
          <button type="submit" className="btn btn-primary">Submit</button>
      	</form>
        </div>
    	);
  	}
});





exports.CommentBox = CommentBox;
