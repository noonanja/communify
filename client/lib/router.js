var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');

    pause();
  }
}
Router.onBeforeAction(requireLogin, {only: 'listingPage'}); // Application requires user login

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound', // URL not found
	waitOn: function() { 
    return [Meteor.subscribe('listings'), Meteor.subscribe('posts')]
  ; } 
});

listingPageController = RouteController.extend({
  template: 'listingPage',
  data: function() {
    listings = {listing: Listings.find({title: this.params.title}) };
    return listings;
  }, 
  findOptions: function() {
    return this.params.title;
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
});

Router.map(function() {
	this.route('home', {path: '/'});

	this.route('listingPage', {
		path: '/listings/:title',
		controller: listingPageController
	});

});

Router.onBeforeAction('loading');




