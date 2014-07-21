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
});

listingPageController = RouteController.extend({
  template: 'listingPage',
  data: function() {
    return {listing: Listings.find({title: this.params.title}) };
  }, 
  findOptions: function() { 
    return this.params.title;
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
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

  this.route('postPage', {
    template: 'postPage',
    path: '/listings/:_id',
    layoutTemplate: 'layout',
    yieldTemplates: {
      'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'},
    },
    waitOn: function() {
      return [
        Meteor.subscribe('singlePost', this.params._id)
      ];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });



});

Router.onBeforeAction(requireLogin, {only: 'listingPage'}); // Application requires user login
Router.onBeforeAction('loading');
Router.onBeforeAction(function() { clearErrors() });
