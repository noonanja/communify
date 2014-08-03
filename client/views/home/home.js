Template.home.events({
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
   }
});