Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});


// We want to make sure that users can only edit certain fields
Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'emails','authors',
              'description','price','title','category').length > 0);
  }
});


Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user()
    
    // Assure the post has not been posted
    postWithSameID = Posts.findOne({_id: postAttributes._id}); 
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new listings");
    
    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please name this listing');

      // ensure the post has a title
    if (!postAttributes.category)
      throw new Meteor.Error(422, 'Please choose a category for this listing');
    
    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302, 
        'This link has already been posted', 
        postWithSameID._id);
    }
    // pick out the whitelisted keys
     var post = _.extend(_.pick(postAttributes, 'category', 'title', 
    	               'authors','emails','description','price'), {
      userId: user._id, 
      username: user.username, 
      submitted: new Date().getTime(), 
      flagged: false
    });
    
    var postId = Posts.insert(post);
    
    // update the count for this category (Listing title)
    var id = Listings.findOne({title: post.category})._id;
    Listings.update(id, {$inc: {count: 1}});
    
    return postId;
  }
});
