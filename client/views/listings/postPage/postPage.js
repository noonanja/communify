Template.postPage.helpers({
  posts: function() {
    return Posts.find({postId: this._id});
  } 
});