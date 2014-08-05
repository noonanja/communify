var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else {
      this.render('accessDenied');
    }
    pause();
  }
}


Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound' // URL not found
});


listingPageController = RouteController.extend({
  template: 'listingPage',
  sort: {submitted: -1},
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
    path: '/',
    progress: {enabled: true}
  });
  
  this.route('listingPage', {
    path: '/listings/:title',
    layoutTemplate: 'layout',
    yieldTemplates: {
      // 'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'}
    },
    progress: {enabled: true},
    controller: listingPageController
  });


  this.route('postSubmit', {
    path: '/submit',
    layoutTemplate: 'layout',
    yieldTemplates: {
     'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'} 
    }
  });

  this.route('postContinue', {
    path: '/submit/continue/:_id',
    progress: {enabled: true},
    layoutTemplate: 'layout',
    yieldTemplates: {
      'footer': {to: 'footer'} 
    },
    waitOn: function() {
      Session.set('postId', this.params._id);
      return [
        Meteor.subscribe('singlemyData', this.params._id),
        Meteor.subscribe('singlePost', this.params._id)
      ];
    },
    // check to see if thsi is a data passing issue
    data: function() { return Posts.findOne(this.params._id); }
  });


  this.route('postPage', {
    path: '/posts/:_id',
    layoutTemplate: 'layout',
     yieldTemplates: {
      'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'}
    },
    progress: {enabled: true},
    waitOn: function() {
      return [
       Meteor.subscribe('singlemyData', this.params._id),
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

Router.onBeforeAction(requireLogin, {except: 'home'});
Router.onBeforeAction('loading');
if (Meteor.isClient)
  Router.onBeforeAction(function() { clearErrors() });