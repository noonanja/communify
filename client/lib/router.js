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
    if (Meteor.loggingIn()) {
      this.render('home');
    }
    else {
      this.render('logInTemplate');
    }
    pause();
  }
}


Router.onBeforeAction(requireLogin, {only: 'map'}); // General map template requires user Login


Router.map(function() {

  this.route('home', {path: '/'}); // This renders the home page

  this.route('map', {
  path: '/user'})

});
