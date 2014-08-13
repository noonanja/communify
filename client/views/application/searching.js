Template.player.events({
   'click #postSearchLink': function(e) {
    e.preventDefault;
   },
   'click .searchTitle' : function (e) {
      e.preventDefault();
      Router.go('postPage', {_id: this._id});
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
      var dayName = ['January', 'February', 'March', 'April', 'May',
                     'June', 'July', 'August', 'September', 'October',
                      'November', 'December'];
      return dayName[this.submitted.getUTCMonth()];
   }
});
