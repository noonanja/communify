var incr = 0;
var incr2 = 0;
Template.postPage.helpers({
  posts: function() {
    return Posts.find({postId: this._id});
  },
  dataEntries: function() {
    return myFiles.find({'metadata.postId': this._id}, {limit: 1});
  },
  dataEntries2: function() {
    return myFiles.find({'metadata.postId': this._id}, {skip: 1});
  },
  numberEntries: function() {
    var total= myFiles.find({'metadata.postId': this._id}).count();

  },
  isImage: function() {
    return imageTypes[this.contentType] != null;
  },
  link: function() {
    return myFiles.baseURL + "/" + this.md5
  },
  incr: function() {
    
    incr= incr + 1;
    
    return incr;
  },
  incr2: function() {
    
    incr2= incr2 + 1;
    
    return incr2;
  }
});

Session.setDefault('limit', 10);

Template.postPage.rendered = function () {
 $('#myCarousel').carousel({
 interval: 4000
 });

 // handles the carousel thumbnails
 $('[id^=carousel-selector-]').click( function(){
 var id_selector = $(this).attr("id");
 var id = id_selector.substr(id_selector.length -1);
 id = parseInt(id);
 $('#myCarousel').carousel(id);
 $('[id^=carousel-selector-]').removeClass('selected');
 $(this).addClass('selected');
 });

// when the carousel slides, auto update
$('#myCarousel').on('slid', function (e) {
var id = $('.item.active').data('slide-number');
id = parseInt(id);
$('[id^=carousel-selector-]').removeClass('selected');
$('[id^=carousel-selector-'+id+']').addClass('selected');
});
};