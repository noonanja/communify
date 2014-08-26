Meteor.publish('listings', function() { 
	return Listings.find();
});

// on the server
Meteor.publish('posts', function(options) {
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});

Meteor.publish('postsSearch', function() { 
	return Posts.find();
});

// for more precise search solution
Meteor.publish('searchPosts', function(term, options) {
  return Posts.search(term, options);
})
