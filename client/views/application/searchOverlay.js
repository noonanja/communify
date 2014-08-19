Template.searchOverlay.helpers({
  postsWithRank: function() { 
    if (Router.current() && (Router.current().path.indexOf('search') != -1)) {
      Posts.find().rewind();
      return Posts.find().map(function(post, index, cursor) {
        post._rank = index;
        return post;
      });
    }
    else return null;
  },
  moreResults: function() {
    Posts.find().rewind();
    return parseInt(Session.get('limit')) == Posts.find().fetch().length;
  },
  term: function() {
    if (Router.current() && !_.isUndefined(Router.current().params.term))
     return Router.current().params.term;
    else return '';
  },
  inputIsNotEmpty: function() {
   var searchVal = Session.get('searchVal');
   return searchVal && searchVal.length > 0;
  },
  isSearching: function() {
   return false;
  }
});

Template.searchOverlay.events({
  'keyup .search-input input': function (e) {
    e.preventDefault();
    var text = $(e.target).val();
    Session.set('searchVal', text);
    Router.go('search', {term: text});
  },
  'click .overlay-close': function() {
    Session.set('limit', 10);
    Router.go('home');
  }
});

// Template.home.rendered = function() {
//   $(window).on('keydown', function(e) {
//     if ((e.which == 27) && (Router.current() && (Router.current().path.indexOf('search') > 0))) {
//   toggleOverlay();
//  }
//   });
// };

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

