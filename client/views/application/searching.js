Template.player.events({
   'click #postSearchLink': function(e) {
    e.preventDefault;
   }
});

Template.player.helpers({
   forSaleC: function () {	
   	return this.parentCategory == 'forSale';
   },
   housingC: function () {
   	return this.parentCategory == 'housing';
   },
   communityC: function () {
   	return this.parentCategory == 'community';
   },
   jobsC: function () {
   	return this.parentCategory == 'jobs';
   },
   day: function() {
      return this.submitted.getUTCDate();
   },
   month: function() {
      // UTC month dates are from 0 to 11
      var dayName = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                     'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      return dayName[this.submitted.getUTCMonth()];
   }
});