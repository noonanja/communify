Template.listingsList.helpers({
	forSale: function() {
		return Listings.find({category: 'forSale'});
	},
	jobs: function() {
		return Listings.find({category: 'housing'}); 
	},
	housing: function() {
		return Listings.find({category: 'jobs'}); 
	},
	community: function() {
		return Listings.find({category: 'community'}); 
	}
});