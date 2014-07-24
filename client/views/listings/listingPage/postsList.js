Template.postsList.helpers({ 
    postsWithRank: function() {
	   Posts.find({category: this.title}).rewind();
	   return Posts.find({category: this.title}).map(function(post, index, cursor) {
		 post._rank = index;
		 return post;
	   });
	},
	hasMore: function() {
		return Posts.find({category: this.title}).count() === this.limit;
	}
});

// Template.postsList.events({ 
// 	'click #load': function() {		
// 		var count = Session.get('limit');
// 		var newCount = count + 7;
// 		Session.set('limit', newCount);
// 		if (newCount >
// 		Meteor.subscribe('posts', {sort: {submitted: -1, _id: -1}
// 			             , title: this.title, limit: newCount});
//      }, 
// });