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
  increment: 5, 
  limit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  data: function() {
    return Listings.findOne({title: this.params.title})
  }, 
  findOptions: function() {
    return {sort: this.sort, title: this.params.title}; 
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions())
  } 
});

NewPostsListController = listingPageController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.listingPage.path({postsLimit: this.limit() + this.increment})
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
    path: '/listings/:title/:postsLimit?',
    layoutTemplate: 'layout',
    yieldTemplates: {
      'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'}
    },
    controller: NewPostsListController
  });


  this.route('postSubmit', {
    path: '/submit',
    progress: {enabled: false}
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
