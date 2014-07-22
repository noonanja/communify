Template.postPage.helpers({
  posts: function() {
  	console.log(this._id);
    return Posts.find({postId: this._id});
  }
});