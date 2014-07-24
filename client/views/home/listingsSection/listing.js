Template.listing.events({ 
	'click .listing': function(e) {
		Session.set('limit', 10);
	}
});