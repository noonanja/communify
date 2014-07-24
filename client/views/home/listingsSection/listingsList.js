Template.listingsList.helpers({
	forSale: function() {
		return Listings.find({category: 'forSale'});
	},
	jobs: function() {
		return Listings.find({category: 'jobs'}); 
	},
	housing: function() {
		return Listings.find({category: 'housing'}); 
	},
	community: function() {
		return Listings.find({category: 'community'}); 
	}
});