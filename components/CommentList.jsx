require('babel-register')({
  presets: ['es2015']
});


var author ="asapovk";
var React = require('react')

import  Comment  from './Comment.jsx';

var CommentList = React.createClass({

		getInitialState: function () {
			if (this.props.nestLevel === 1){
				return {commentsLimit: 5};
			}
			else if (this.props.nestLevel === 2 ){
				return {commentsLimit: 2};
			}

			else {
			return {commentsLimit: 0};
			}
		},

		//handleCloseOtherSubmitForms: function (){
		//	this.setState({closeSubmitForms: false});

		//	console.log('works');
		//},

		renderShowMore: function (restOfComments) {
			if (restOfComments > 0) {
				var word = "comments";
				var wellClassName ="well text-center";
				if (this.props.nestLevel > 1){
					word = "replies";
					wellClassName = "text-center";
				}
					return (
						<div className={wellClassName}>
							<a href="#" onClick={this.handleShowRestComments} ><h4>Show more {word}</h4></a>
						</div>
					);
			}
		},

		handleShowRestComments: function (e) {
				e.preventDefault();
				this.setState({commentsLimit: this.state.commentsLimit + 5})
		},

  	render: function() {
    var data = this.props.data;
    var comments = [];
		var counter = 0;
		var limit = this.state.commentsLimit;
    for (var id in data)
     {
			    var dataArray = data[id];
       		comments.unshift(<Comment key = {dataArray.id} onCloseOtherSumbitForms showComment={this.props.closeSubmitForms} nestLevel={this.props.nestLevel} author = {dataArray.author}  text = {dataArray.text} date={dataArray.date} isUserThumbed={dataArray.isUserThumbed} thumbs={dataArray.thumbs} nestedComments= {dataArray.nestedComments}/>);
		 }
		 	var commentsLength = comments.length;
			var CommentsToShow = comments.slice(0,limit + parseInt(this.props.userPosted));
			//CommentsToShow = comments.slice(0,10);

    	return (
	      <div className="commentList">
	        	{CommentsToShow}
						{this.renderShowMore(commentsLength - limit)}
	      </div>
    	);
  }
});

export default CommentList;
