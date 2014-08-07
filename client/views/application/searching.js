Template.player.events({
   'click #postSearchLink': function(e) {
    e.preventDefault;
   }
});

Template.player.helpers({
   forSaleC: function () {
   	console.log(this.parentCategory);
   	return this.parentCategory == 'For Sale';
   },
   housingC: function () {
   	return this.parentCategory == 'Housing';
   },
   communityC: function () {
   	return this.parentCategory == 'Community';
   },
   jobsC: function () {
   	return this.parentCategory == 'Jobs';
   },
});