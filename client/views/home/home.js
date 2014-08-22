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

Template.searchVal.helpers({
  searchVal: function() {
    var val = Session.get('searchVal');
    if (val != null) return val.trunc(14, true);
    else return 'search' 
  }
});

String.prototype.trunc = function(n,useWordBoundary) {
     var toLong = this.length>n,
       s_ = toLong ? this.substr(0,n-1) : this;
       s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
    return  toLong ? s_ + '....' : s_;
};