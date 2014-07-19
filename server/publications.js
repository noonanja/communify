Meteor.publish('forSale', function() { 
	return ForSale.find();
});

Meteor.publish('housing', function() { 
	return Housing.find();
});

Meteor.publish('jobs', function() { 
	return Jobs.find();
});

Meteor.publish('community', function() { 
	return Community.find();
});