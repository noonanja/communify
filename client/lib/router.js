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
	waitOn: function() { return Meteor.subscribe('listings'); } 
});

listingPageController = RouteController.extend({
  template: 'listingPage',
  // waitOn: function() {
  //   return Meteor.subscribe('posts', this.findOptions());
  // },
  data: function() {
    listings = { listing: Listings.find({title: this.params.title}) };
    return listings;
  }
    
});

Router.map(function() {
	this.route('home', {path: '/'});

	this.route('listingPage', {
		path: '/listings/:title',
		controller: listingPageController
	});

});

Router.onBeforeAction('loading');




