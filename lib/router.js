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
  increment: 7,
  sort: {submitted: -1, _id: -1},
  data: function() {
    return Listings.findOne({title: this.params.title})
  },
  findOptions: function() {
    return {sort: this.sort, title: this.params.title, limit: this.limit()}; 
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions())
  } 
});

NewPostsListController = listingPageController.extend({
  limit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  // *********** Router wants to see if the route for 'listingPage' has a limit
  // but no path is defined for postsLimit
  nextPath: function() {
    return Router.routes.listingPage.path({postsLimit: this.limit() + this.increment})
  }
});



Router.map(function() {

  this.route('home', {
    path: '/',
    layoutTemplate: 'layout',
    yieldTemplates: {
      'topBar': {to: ''},
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
    controller: NewPostsListController
  });

  this.route('postsList', {
    path: '/listings/:postsLimit?',
    controller: NewPostsListController
  });


  this.route('postPage', {
    path: '/posts/:_id',
    layoutTemplate: 'layout',
     yieldTemplates: {
      'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'}
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
