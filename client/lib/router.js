Router.configure({
  loadingTemplate: 'loading', // HTML loading template
  notFoundTemplate: 'notFound' // URL not found
});



var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    }
    else {
      this.render('home');
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
