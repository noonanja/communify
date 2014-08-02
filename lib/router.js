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
  sort: {submitted: -1, _id: -1},
  limit: function() {return Session.get('limit')},
  findOptions: function() {
    return {sort: this.sort, title: this.params.title, limit: this.limit()}; 
  },
  waitOn: function() {
    return Meteor.subscribe("posts", this.findOptions());
  },
  data: function() {
    return Listings.findOne({title: this.params.title})
  }
});


Router.map(function() {

  this.route('home', {
    path: '/'
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
    path: '/submit',
    progress: {enabled: false},
    layoutTemplate: 'layout',
    yieldTemplates: {
     'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'} 
    }
  });

  this.route('postContinue', {
    path: '/submit/continue',
    progress: {enabled: false},
    layoutTemplate: 'layout',
    yieldTemplates: {
     'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'} 
    },
    waitOn: function() {
      return [
        Meteor.subscribe('myData', Meteor.userId())
      ];
    },
    data: function() { return this.params._id }
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


// animateContentOut = function(pause) {
//     return $('#content').removeClass("animated fadeIn");
// }

// Router.onAfterAction(animateContentOut);

// animateContentIn = function() {
//     return $('#content').addClass("animated fadeIn");
// }
// Router.onAfterAction(animateContentIn);

// # This assigns a file drop zone to the "file table"
 
Router.onBeforeAction(requireLogin, {only: 'listingPage'});
Router.onBeforeAction(requireLogin, {only: 'listingPage'}); // Application requires user login
Router.onBeforeAction('loading');
Router.onBeforeAction(function() { clearErrors() });
Router.onBeforeAction(function() { Session.setDefault("limit", 10) }, {only: 'listingPage'});