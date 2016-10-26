
var CommentBoxReducer = (state = false, action) => {
  if(action.type === 'CLOSE_OTHERS'){
    console.log('action dispatched');
    return !state;
  }

}


module.exports = CommentBoxReducer;
