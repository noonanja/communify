Meteor.publish('listings', function() { 
	return Listings.find();
});

// on the server
Meteor.publish('posts', function(title) {
    // if(isAdmin(this.userId)) {
    //      return Posts.find({category: title}); }
    //  else {
      return Posts.find({flagged: false, category: title});
    //}
});

Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});




