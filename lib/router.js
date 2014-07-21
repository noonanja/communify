var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');

    pause();
  }
}

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound', // URL not found
	// waitOn: function() { 
 //    return [Meteor.subscribe('listings'), Meteor.subscribe('posts')]
 //  ; } 
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


postPageController = RouteController.extend({
  template: 'postPage',
  waitOn: function() {
      return [
        Meteor.subscribe('singlePost', this.params._id)
      ];
    },
    data: function() { 
      return Posts.findOne(this.params._id); 
    }
}); 



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
    template: 'postSubmit',
    path: '/submit',
    layoutTemplate: 'layout',
    yieldTemplates: {
      'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'}
    },
    progress: {enabled: false}
  });

  // this.route('postPage', {
  //   layoutTemplate: 'layout',
  //   template: 'postPage',
  //   path: '/listings/:_id',
  //   controller: postPageController
  // });



});

Router.onBeforeAction(requireLogin, {only: 'listingPage'}); // Application requires user login
Router.onBeforeAction('loading');
Router.onBeforeAction(function() { clearErrors() });