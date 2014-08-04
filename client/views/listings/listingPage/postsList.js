var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null);

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
	},
	attributes: function() {
		var post = _.extend({}, Positions.findOne({postId: this._id}), this);
		var newPosition = post._rank * POST_HEIGHT;
		var attributes = {};

		if (_.isUndefined(post.position)) {
			attributes.class = 'post invisible';
		} else {
			var delta = post.position - newPosition;      
			attributes.style = "top: " + delta + "px";
			if (delta === 0)
				attributes.class = "post animate"
		}

		Meteor.setTimeout(function() {
			Positions.upsert({postId: post._id}, {$set: {position: newPosition}})
		});

		return attributes;
	},
	dataEntries: function() {
		Meteor.subscribe('singlemyData', this._id);
		return myFiles.find({'metadata.postId': this._id});
	},
	isImage: function() {
		return imageTypes[this.contentType] != null;
	},
	link: function() {
		return myFiles.baseURL + "/" + this.md5
	}
});


Template.loadMore.events({
	"click": function(event) {	
		event.preventDefault();
		Session.set("limit", Session.get("limit") + 10);
	}   
})