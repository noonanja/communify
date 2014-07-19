Template.application.helpers({
	forSale: function() {
		return ForSale.find(); 
	},
	jobs: function() {
		return Jobs.find(); 
	},
	housing: function() {
		return Housing.find(); 
	},
	community: function() {
		return Community.find(); 
	}
});