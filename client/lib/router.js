// Router.configure({
//   layoutTemplate: 'layout',
//   loadingTemplate: 'loading',
//   logInTemplate: 'logIn', // HTML loading template
//   notFoundTemplate: 'notFound', // URL not found
//   waitOn: function() { return Meteor.subscribe('forSale'); }
// });

// Router.onBeforeAction('loading');
// Router.onBeforeAction(requireLogin, {only: 'listings'}); // Application requires user login
// Router.onBeforeAction('loading');

// Router.map(function() {
//   this.route('home', {path: '/'});  
//   this.route('listingPage', {
//     path: '/listings/:_id',
//     data: function() { return Posts.findOne(this.params._id); }
//   });
// });


// var requireLogin = function(pause) {
//   if (! Meteor.user()) {
//     if (Meteor.loggingIn())
//       this.render(this.loadingTemplate);
//     else
//       this.render('accessDenied');

//     pause();
//   }
// }

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('forSale');} 


});

Router.map(function() {
	this.route('home', {path: '/'});

	this.route('listingPage', {
		path: '/listings/:_id',
		data: function() { 
			return function() {
				forSale.findOne(this.params._id);
				Housing.findOne(this.params._id);
				Community.findOne(this.params._id);
				Jobs.findOne(this.params._id);
			} 
		}
	});

});

Router.onBeforeAction('loading');




