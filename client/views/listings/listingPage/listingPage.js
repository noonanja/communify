Template.listingPage.helpers({ 
    postsWithRank: function() {
	   Posts.find({category: this.title}).rewind();
	   return Posts.find({category: this.title}).map(function(post, index, cursor) {
		 post._rank = index;
		 return post;
	   });
	}
});