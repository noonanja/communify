Meteor.publish('listings', function() { 
	return Listings.find();
});
// server: don't allow client to insert into listings
Listings.allow({
  insert: function () {
    return false;
  }
});

// on the server
Meteor.publish('posts', function(title) {
    // if(isAdmin(this.userId)) {
    //      return Posts.find({category: title}); }
    //  else {
      return Posts.find({flagged: false, category: title});
    //}
});


