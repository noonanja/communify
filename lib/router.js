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
  findOptions: function() {
    return {sort: this.sort, title: this.params.title}; 
  },
  waitOn: function() {
    var handle = Meteor.subscribeWithPagination('posts', this.findOptions(),10);
    return handle
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    return Listings.findOne({title: this.params.title})
  }
});

NewPostsListController = listingPageController.extend({
  
  nextPath: function() {
    return Router.go('listingPage')
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


//Router.onBeforeAction((function() {Session.setDefault('limit', 7)}), {only: 'listingPage'}  );
Router.onBeforeAction(requireLogin, {only: 'listingPage'}); // Application requires user login
Router.onBeforeAction('loading');
Router.onBeforeAction(function() { clearErrors() });