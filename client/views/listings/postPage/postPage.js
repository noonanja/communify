Template.postPage.helpers({
  posts: function() {
    return Posts.find({postId: this._id});
  },
  stats: function() {
  	console.log(this.title);
  	console.log(this.category);
  	console.log(this._id);
  }
});