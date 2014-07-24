Template.postsList.helpers({ 
    postsWithRank: function() {
	   Posts.find({category: this.title}).rewind();
	   return Posts.find({category: this.title}).map(function(post, index, cursor) {
		 post._rank = index;
		 return post;
	   });
	},
	moreResults: function() {
	  return parseInt(Session.get('limit')) == Posts.find().fetch().length;
	}
});


Template.postsList.events({ 
	'click #loadMore': function(event, template) {
  	var count = Session.get('limit') + 10;
    Session.set('limit', count);
    }
});

// Template.postsList.rendered = function () {
//   $("html, body").animate({ scrollTop: $("#loadMore").scrollTop() }, 1000);
// };