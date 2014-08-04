Template.leftBarListingPage.helpers({
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

function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);