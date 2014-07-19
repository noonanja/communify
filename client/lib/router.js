Router.configure({
  logInTemplate: 'logIn', // HTML loading template
  notFoundTemplate: 'notFound', // URL not found
  loadingTemplate: 'loading'//,
  // waitOn: function() { 
  //   return [Meteor.subscribe('notifications')]
  // }
});


var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    pause();
  }
}


Router.onBeforeAction(requireLogin, {only: 'listings'}); // Application requires user login
Router.onBeforeAction('loading');

Router.map(function() {
  
  this.route('home', {
    path: '/', // This renders the home page
   // controller: NewPostsListController
  });

  this.route('listings', {
    path: '/listings/:_id'
    // waitOn: function() {
    //   return [
    //     Meteor.subscribe('singlePost', this.params._id),
    //     Meteor.subscribe('comments', this.params._id)
    //   ];
    // },
    // data: function() { return Posts.findOne(this.params._id); }
  });


});
