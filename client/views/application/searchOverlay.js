Template.searchOverlay.helpers({
  postsWithRank: function() { 
    if (Router.current() && (Router.current().path.indexOf('search') != -1)) {
    this.posts.rewind();
    return this.posts.map(function(post, index, cursor) {
      post._rank = index;
      return post;
    });
  }
  else return null;
  }
});


Template.searchOverlay.events({
  'keyup .search-input input': function (e) {
    e.preventDefault();
    var text = $(e.target).val();
    Session.set('searchVal', text);
    Router.go('search', {term: text});
  }
});


Template.searchOverlay.inputIsNotEmpty = function () {
  var searchValue = Session.get('searchValue');
  return searchValue && searchValue.length > 0;
};

Template.searchOverlay.isSearching = function () {
  return false;
};

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

Template.searchVal.helpers({
  searchVal: function() {
    return Session.get('searchVal');
  }
});

