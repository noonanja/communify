Template.postPage.helpers({
  posts: function() {
    return Posts.find({postId: this._id});
  } 
});

Session.setDefault('limit', 10);