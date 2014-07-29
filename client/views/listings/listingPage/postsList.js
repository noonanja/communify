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


Template.loadMore.events({
"click": function(event) {	
  event.preventDefault();
  Session.set("limit", Session.get("limit") + 10);
   }   
})