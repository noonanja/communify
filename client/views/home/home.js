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
  }
 });

Template.home.rendered = function() {
  document.title = "Classify";
  return $("<meta>", {
    name: "description",
    content: "The best way to buy, sell, find housing and jobs, and engage in your college community"
  }).appendTo("head");
};

