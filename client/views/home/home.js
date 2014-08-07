Template.home.events({
  // Automatic scrolling
  'click #listingsScroll': function(e) {
  	e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#listings").offset().top
    }, 1000);
   },
   'click #contactScroll': function(e) {
  	e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#contact").offset().top
    }, 1000);
   },
   'click #loadSearch': function(e) {
    e.preventDefault;
    Meteor.subscribe("postsSearch");
   }
});