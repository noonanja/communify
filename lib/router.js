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

// PostSubmitController = RouteController.extend({
//   template: 'postSubmit',
//   data: function() {
//     var hasMore = this.posts().count() === this.limit();
//     return {
//       posts: this.posts(),
//       nextPath: hasMore ? this.nextPath() : null
//     };
//   }
// });


Router.map(function() {
	
  this.route('home', {
  path: '/',
  layoutTemplate: 'layout',
  yieldTemplates: {
    'topBar': {to: 'topBar'},
    'footer': {to: 'footer'}
   }
  });
  
 

	this.route('listingPage', {
		path: '/listings/:title',
    layoutTemplate: 'layout',
    yieldTemplates: {
    'topBarListingPage': {to: 'topBar'},
    'footer': {to: 'footer'}
   },
		controller: listingPageController
	});

  this.route('postSubmit', { 
    path: '/listings/:_id/submit',
    yieldTemplates: {
    'topBarSubmitPage': {to: 'topBar'},
    'footer': {to: 'footer'}
   }
   //controller: PostSubmitController
});


});

Router.onBeforeAction('loading');




