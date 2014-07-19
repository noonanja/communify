Meteor.publish('listings', function() { 
	return Listings.find();
});

// server: don't allow client to insert into listings
Listings.allow({
  insert: function () {
    return false;
  }
});